"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { MessagingPage } from "@/app/(employer)/employer/message/components/MessagingPage";
import Header from "@/app/(routes)/(components)/header";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Alice Smith",
    lastMessage: "See you tomorrow!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Johnson",
    lastMessage: "How's the project going?",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Charlie Brown",
    lastMessage: "Thanks for your help!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function DirectMessaging() {
  const [newMessage, setNewMessage] = useState("");


  return (
    <div className="flex min-h-[80vh] w-full flex-col ">
      <Header />
      <MessagingPage />
    </div>
  );
}
