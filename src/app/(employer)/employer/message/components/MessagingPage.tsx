"use client";

import { useState } from "react";
import { MessageList } from "./MessageList";
import { MessageThread } from "./MessageThread";

// Sample data for demonstration
const conversations = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Ứng viên",
    lastMessage: "Tôi rất quan tâm đến vị trí này",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Ứng viên",
    lastMessage: "Xin cảm ơn về thông tin",
    time: "Hôm qua",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Ứng viên",
    lastMessage: "Tôi có thể gửi CV của mình qua email được không?",
    time: "Thứ 2",
    unread: 1,
    online: true,
  },
  {
    id: "4",
    name: "Phạm Thị D",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Ứng viên",
    lastMessage: "Cảm ơn về cơ hội phỏng vấn",
    time: "23/03",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Ứng viên",
    lastMessage: "Tôi đã gửi thông tin theo yêu cầu",
    time: "20/03",
    unread: 0,
    online: false,
  },
];
interface Message {
  id: string;
  sender: "recruiter" | "candidate";
  content: string;
  time: string;
}
const messages: Message[] = [
  {
    id: "1",
    sender: "recruiter",
    content:
      "Chào bạn, cảm ơn bạn đã quan tâm đến vị trí Kỹ sư phần mềm tại công ty chúng tôi.",
    time: "10:30",
  },
  {
    id: "2",
    sender: "candidate",
    content:
      "Dạ, chào anh/chị. Tôi rất quan tâm đến vị trí này và muốn tìm hiểu thêm về yêu cầu công việc.",
    time: "10:32",
  },
  {
    id: "3",
    sender: "recruiter",
    content:
      "Vị trí này yêu cầu ít nhất 2 năm kinh nghiệm với React và Node.js. Bạn có kinh nghiệm với các công nghệ này không?",
    time: "10:35",
  },
  {
    id: "4",
    sender: "candidate",
    content:
      "Vâng, tôi có 3 năm kinh nghiệm làm việc với React và 2 năm với Node.js. Tôi cũng có kinh nghiệm với Next.js và TypeScript.",
    time: "10:40",
  },
  {
    id: "5",
    sender: "recruiter",
    content:
      "Tuyệt vời! Chúng tôi cũng đang sử dụng Next.js và TypeScript. Bạn có thể tham gia phỏng vấn vào tuần sau không?",
    time: "10:45",
  },
  {
    id: "6",
    sender: "candidate",
    content: "Tôi rất quan tâm đến vị trí này",
    time: "10:50",
  },
];

export function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Message list sidebar */}
        <MessageList
          conversations={conversations}
          selectedId={selectedConversation.id}
          onSelect={setSelectedConversation}
        />

        {/* Message thread */}
        <MessageThread
          conversation={selectedConversation}
          messages={messages}
        />
      </div>
    </div>
  );
}
