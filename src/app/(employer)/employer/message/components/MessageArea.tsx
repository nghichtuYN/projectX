import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTimeSince } from "@/lib/utils";
import { RefObject } from "react";
import DialogImage from "../../settings/company/(component)/DialogImage";
import { Conversation, Message } from "@/types/Conversation";
import { FileText } from "lucide-react";
type Props = {
  conversationData: Conversation | undefined;
  isClone: boolean;
  messages: Message[];
  conversation: Conversation | undefined;
  messagesEndRef: RefObject<HTMLDivElement | null>;
};
const MessageArea = ({
  conversationData,
  isClone,
  messages,
  conversation,
  messagesEndRef,
}: Props) => {
  const isPdfFile = (file: string) => {
    return file.toLowerCase().endsWith(".pdf");
  };
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {!isClone &&
          conversationData &&
          messages?.map((message, index) => (
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
                    <>
                      {isPdfFile(message.attachedFile.name) ? (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-100 rounded-md">
                          <FileText className="h-6 w-6 text-red-500" />
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${message.attachedFile.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline w-[200px] truncate" 
                          >
                            {message.attachedFile.name}
                          </a>
                        </div>
                      ) : (
                        <DialogImage
                          image={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${message.attachedFile.path}`}
                        />
                      )}
                    </>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {!message?.isRead ? getTimeSince(message.created) : "Đã xem"}
                </p>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageArea;
