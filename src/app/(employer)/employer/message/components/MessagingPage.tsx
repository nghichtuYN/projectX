"use client";

import { useEffect, useState } from "react";
import { MessageList } from "./MessageList";
import { MessageThread } from "./MessageThread";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllConversation } from "@/queries/queries";
import { useDebouncedCallback } from "use-debounce";
import { Conversation } from "@/types/Conversation";
import { markAsReadMessage } from "@/services/message";

export function MessagingPage() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const cid = searchParams.get("cid") || "";
  const [isClone, setIsClone] = useState(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  const { data: conversations, refetch } = getAllConversation(searchValue, 1);
  const [selectedConversation, setSelectedConversation] = useState<
    Conversation | undefined
  >(undefined);
  const [conversationsList, setConversationsList] = useState<Conversation[]>(
    []
  );

  useEffect(() => {
    if (conversations?.items?.length > 0) {
      setConversationsList(conversations.items);

      if (cid) {
        const targetConversation = conversations.items.find(
          (conv) => conv.id === cid
        );
        if (targetConversation) {
          setSelectedConversation(targetConversation);
        } else {
          setSelectedConversation(conversations.items[0]);
        }
      } else {
        setSelectedConversation(conversations.items[0]);
      }
    } else {
      setConversationsList([]);
      setSelectedConversation(undefined);
    }
  }, [conversations, cid]);

  const handleAddConversation = () => {
    setIsClone(true);
    const newConversation = {
      id: Date.now().toString(),
      isGroup: true,
      groupName: "Tin nhắn mới",
    };
    setConversationsList((prev) => [newConversation, ...prev]);
    const params = new URLSearchParams(searchParams);
    params.delete("cid");
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);

    const params = new URLSearchParams(searchParams);
    params.set("cid", conversation.id);
    router.replace(`${pathName}?${params.toString()}`);

    if (
      conversation.latestMessageDetails &&
      !conversation.latestMessageDetails.isRead &&
      conversation.latestMessageDetails.sender?.id ===
        conversation?.participant?.id
    ) {
      try {
        await markAsReadMessage(conversation.latestMessageDetails.id);
        refetch();
      } catch (error) {
        console.error("Lỗi khi đánh dấu tin nhắn là đã đọc:", error);
      }
    }
  };

  return (
    <div className="flex h-[90vh] bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Message list sidebar */}
        <MessageList
          handelAddConversation={handleAddConversation}
          handleSearch={handleSearch}
          searchValue={searchValue}
          conversations={conversationsList}
          selectedId={selectedConversation?.id}
          onSelect={handleSelectConversation}
        />

        {/* Message thread */}
        <MessageThread
          setSelectedConversation={setSelectedConversation}
          conversations={conversationsList}
          setIsClone={setIsClone}
          refetch={refetch}
          isClone={isClone}
          conversation={selectedConversation}
        />
      </div>
    </div>
  );
}
