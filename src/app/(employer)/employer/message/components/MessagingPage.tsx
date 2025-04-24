"use client";

import { useEffect, useState } from "react";
import { MessageList } from "./MessageList";
import { MessageThread } from "./MessageThread";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllConversation } from "@/queries/queries";
import { useDebouncedCallback } from "use-debounce";
import { Conversation } from "@/types/Conversation";


export function MessagingPage() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") || "";
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

  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>(
    conversations?.items[0]
  );
  const [converstaionsList, setConversationsList] = useState<Conversation[]>(
    []
  );
  useEffect(() => {
    if (conversations?.items?.length > 0) {
      setConversationsList(conversations.items);
      setSelectedConversation((prev) => prev ?? conversations.items[0]);
    }
  }, [conversations]);
  const handlehandelAddConversation = () => {
    setIsClone(true);
    const newConversation = {
      id: Date.now().toString(),
      isGroup: true,
      groupName: "Tin nhắn mới",
    };
    setConversationsList((prev) => [newConversation, ...prev]);
  };

  return (
    <div className="flex h-[90vh] bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Message list sidebar */}
        <MessageList
          handelAddConversation={handlehandelAddConversation}
          handleSearch={handleSearch}
          searchValue={searchValue}
          conversations={converstaionsList}
          selectedId={selectedConversation?.id}
          onSelect={setSelectedConversation}
        />

        {/* Message thread */}
        <MessageThread
          setSelectedConversation={setSelectedConversation}
          conversations={converstaionsList}
          setIsClone={setIsClone}
          refetch={refetch}
          isClone={isClone}
          conversation={selectedConversation}
        />
      </div>
    </div>
  );
}
