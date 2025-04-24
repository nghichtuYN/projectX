"use client";

import {
  useState,
  useRef,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreVertical,
  Phone,
  Video,
  Info,
  Paperclip,
  ImageIcon,
  Send,
  Smile,
  MessageSquare,
  X,
} from "lucide-react";
import {
  Conversation,
  ListConversations,
  User,
  Message,
  AttachedFile,
} from "@/types/Conversation";
import SearchPopover from "./SearchPopover";
import { useDebounce } from "use-debounce";
import { getAConversation, getAllConversationUser } from "@/queries/queries";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { SignalRContext } from "@/app/(routes)/(components)/AuthWraper";
import { getTimeSince } from "@/lib/utils";
import { useMutationHook } from "@/hooks/useMutationHook";
import { toast } from "sonner";
import { sendMessages } from "@/services/message";

interface MessageThreadProps {
  conversation: Conversation | undefined;
  isClone: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ListConversations>>;
  setIsClone: Dispatch<SetStateAction<boolean>>;
  setSelectedConversation: Dispatch<SetStateAction<Conversation | undefined>>;
  conversations: Conversation[] | undefined;
}

const formSchema = z.object({
  content: z.string().optional(),
  receiverId: z.string(),
  file: z.string().optional(),
});

export type MessageFormValues = z.infer<typeof formSchema>;

export function MessageThread({
  conversation,
  isClone,
  refetch,
  setIsClone,
  setSelectedConversation,
  conversations,
}: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const context = useContext(SignalRContext);
  const connection = context?.connection;
  const [file, setFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTerm] = useDebounce(search, 500);
  const [messages, setMessages] = useState<Message[]>([]); // Use setMessages from context
  const { data: conversationData, refetch: refetchConversation } =
    getAConversation(conversation?.id ?? "");
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      receiverId: "",
      file: "",
    },
  });

  const { data: users } = getAllConversationUser(searchTerm, open);

  // Sync initial messages from conversationData
  useEffect(() => {
    if (conversationData?.messages?.length) {
      form.reset({
        receiverId: conversationData?.participant?.id || "",
        content: "",
        file: undefined,
      });
      setMessages(conversationData.messages);
    }
  }, [conversationData, form]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (data: Message) => {
        console.log("💬 Tin nhắn mới:", data);
        setMessages((prev: Message[]) => [...prev, data]);
      });
    }
    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, [connection]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const mutation = useMutationHook(
    (data: FormData) => sendMessages(data),
    (data) => {
      toast.success("Gửi tin nhắn thành công");
      form.reset();
      setSelectedUser(undefined);
      setFile(undefined);
      setIsClone(false);
      setMessages((prev: Message[]) => [...prev, data]);
      refetch();
      // refetchConversation()
      console.log("run send message");
      if (conversations) {
        if (isClone) {
          setSelectedConversation(conversations[-1]);
        } else {
          // setSelectedConversation(conversations[0]);
        }
      }
    }
  );
  const sendMessage = async (value: MessageFormValues) => {
    if (!connection || !value.receiverId || !setMessages) return;

    const formData = new FormData();
    if (value.content) {
      formData.append("content", value.content);
    }
    if (value.file) {
      formData.append("attachedFile", value.file); // File path or URL from handleFileUpload
    }
    formData.append("receiverId", value.receiverId);
    mutation.mutate(formData);
  };

  const handleSelectUser = (id: string) => {
    const user = users?.find((user) => user.id === id);
    if (user) {
      setSelectedUser(user);
      form.setValue("receiverId", id);
      setOpen(false);
    }
  };

  const handleRemoveUser = () => {
    setSelectedUser(undefined);
    form.setValue("receiverId", "");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const attachedFile: AttachedFile = {
        id: Date.now().toString(),
        name: uploadedFile.name,
        path: URL.createObjectURL(uploadedFile),
        uploaded: new Date().toISOString(),
      };
      setFile(uploadedFile);
      form.setValue("file", attachedFile.path);
    }
  };

  // Filter messages for the current conversation

  // Empty state when no conversation is selected
  if (!conversation && !isClone) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-medium">Chưa chọn cuộc trò chuyện</h3>
        <p className="max-w-md text-muted-foreground">
          Vui lòng chọn một cuộc trò chuyện từ danh sách bên trái hoặc tạo một
          cuộc trò chuyện mới để bắt đầu.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {isClone ? (
        <div className="flex relative items-center gap-2 border-b p-4">
          <p>Đến: </p>
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={
                    selectedUser.profilePicture
                      ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${selectedUser.profilePicture}`
                      : "/default-avatar.png"
                  }
                  alt={selectedUser.name}
                />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="p-1 rounded-md flex hover:bg-gray-200 bg-accent justify-between gap-2 items-center">
                <h3 className="font-medium">{selectedUser.name}</h3>
                <X
                  onClick={handleRemoveUser}
                  className="w-3 h-3 cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <>
              <Input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setOpen(true)}
                placeholder="Người nhận..."
                className="border-none focus-visible:ring-0 placeholder:font-medium"
              />
              {open && (
                <SearchPopover
                  users={users}
                  commandRef={commandRef}
                  onSelectUser={handleSelectUser}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={
                  conversation?.groupPicture
                    ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${conversation.groupPicture}`
                    : "/default-avatar.png"
                }
                alt={conversation?.groupName}
              />
              <AvatarFallback>
                {conversation?.groupName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">
                {conversation?.participant?.name || conversation?.groupName}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {!isClone &&
            conversationData &&
            messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender.id === conversation?.participant?.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.sender.id === conversation?.participant?.id && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage
                      src={
                        message.sender.profilePicture
                          ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${message.sender.profilePicture}`
                          : "/default-avatar.png"
                      }
                      alt={message.sender.name}
                    />
                    <AvatarFallback>
                      {message.sender.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div
                    className={`max-w-md rounded-lg px-4 py-2 ${
                      message.sender.id !== conversation?.participant?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.attachedFile && (
                      <a
                        href={message.attachedFile.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline"
                      >
                        {message.attachedFile.name}
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {getTimeSince(message.created)}
                  </p>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t p-4 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendMessage)}
            className="flex items-end w-full gap-2"
          >
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => inputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button type="button" variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Nhập tin nhắn..."
                      className="flex-1"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!form.getValues("content")?.trim() && !file}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
