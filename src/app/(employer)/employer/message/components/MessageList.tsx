"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { DebouncedState } from "use-debounce";
import { Conversation } from "@/types/Conversation";
import { getTimeSince } from "@/lib/utils";

interface MessageListProps {
  conversations: Conversation[] | undefined;
  selectedId: string | undefined;
  onSelect: (conversation: Conversation) => void;
  handleSearch: DebouncedState<(term: string) => void>;
  searchValue: string;
  handelAddConversation: () => void;
}

export function MessageList({
  conversations,
  selectedId,
  onSelect,
  searchValue,
  handleSearch,
  handelAddConversation,
}: MessageListProps) {
  return (
    <div className="flex w-full flex-col border-r md:w-80 lg:w-96">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Tin nhắn</h2>
        <Button onClick={handelAddConversation} size="icon" variant="ghost">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative px-4 pb-2">
        <Search className="absolute left-7 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm tin nhắn..."
          className="pl-9"
          defaultValue={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {conversations && conversations?.length > 0 ? (
          <div className="divide-y">
            {conversations?.map((conversation) => (
              <button
                key={conversation.id}
                className={`flex w-full items-start gap-3 p-4 text-left hover:bg-muted/50 ${
                  selectedId === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => onSelect(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={
                        conversation?.participant?.profilePicture
                          ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${conversation?.participant?.profilePicture}`
                          : "/images/default-avatar.jpeg"
                      }
                      alt={conversation?.groupName}
                    />
                    <AvatarFallback>
                      {conversation?.groupName?.charAt(0) ||
                        conversation?.participant?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p
                      className={`font-medium ${
                        !conversation?.latestMessageDetails?.isRead &&
                        conversation?.latestMessageDetails?.sender?.id ===
                          conversation?.participant?.id
                          ? "font-bold"
                          : "font-normal"
                      }`}
                    >
                      {conversation?.participant?.name ||
                        conversation?.groupName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {getTimeSince(conversation?.latestMessage!)}
                      </span>
                      {!conversation?.latestMessageDetails?.isRead &&
                        conversation?.latestMessageDetails?.sender?.id ===
                          conversation?.participant?.id && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                    </div>
                  </div>
                  <p
                    className={`mt-1 truncate text-sm ${
                      !conversation?.latestMessageDetails?.isRead &&
                      conversation?.latestMessageDetails?.sender?.id ===
                        conversation?.participant?.id
                        ? "text-foreground font-medium"
                        : "text-muted-foreground font-normal"
                    }`}
                  >
                    {conversation?.latestMessageDetails?.sender.id !==
                    conversation?.participant?.id
                      ? "Bạn: " + conversation?.latestMessageDetails?.content
                      : conversation?.latestMessageDetails?.content}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-muted-foreground">
            <p>Không tìm thấy kết quả phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
