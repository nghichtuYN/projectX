import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Flag, ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";

// Simulated database of posts
const posts = [
  {
    id: 1,
    title: "Tips for negotiating salary as a junior developer",
    content: `As a junior developer, negotiating your salary can be daunting. Here are some tips:

1. Research the market rates for your position and location.
2. Highlight your unique skills and any relevant projects or internships.
3. Practice your negotiation pitch with a friend or mentor.
4. Don't be afraid to ask for what you're worth, but also be realistic.
5. Consider the entire compensation package, not just the base salary.

Remember, negotiation is a normal part of the hiring process. Good luck!`,
    author: "Alice Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Career Advice",
    timestamp: "2 hours ago",
    replies: 15,
    likes: 42,
    isWatched: false,
  },
  {
    id: 2,
    title: "How to prepare for a technical interview at FAANG companies",
    content: `Preparing for a technical interview at FAANG companies requires dedication and a structured approach. Here are some key steps:

1. Master data structures and algorithms
2. Practice coding problems on platforms like LeetCode or HackerRank
3. Understand system design principles
4. Brush up on your computer science fundamentals
5. Prepare for behavioral questions
6. Mock interviews with peers or mentors

Remember, consistency is key. Good luck with your preparation!`,
    author: "Bob Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Interview Tips",
    timestamp: "1 day ago",
    replies: 28,
    likes: 76,
    isWatched: true,
  },
];

// Simulated replies
const replies = [
  {
    id: 1,
    author: "Bob Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Great advice! I would add that it's also important to be prepared to walk away if the offer doesn't meet your minimum requirements.",
    timestamp: "1 hour ago",
    likes: 7,
  },
  {
    id: 2,
    author: "Charlie Brown",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "I recently went through this process and found that having a portfolio of projects really helped strengthen my position during negotiations.",
    timestamp: "30 minutes ago",
    likes: 3,
  },
];

export default function ForumPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5e6da]">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/forum"
          className="flex items-center text-red-500 hover:text-red-600 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.authorAvatar} alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
              <Badge>{post.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like ({post.likes})
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Reply ({post.replies})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={post.isWatched ? "text-red-500" : ""}
              >
                <Bell className="mr-2 h-4 w-4" />
                {post.isWatched ? "Watching" : "Watch"}
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Flag className="mr-2 h-4 w-4" />
              Report
            </Button>
          </CardFooter>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Replies</h2>

        {replies.map((reply) => (
          <Card key={reply.id} className="mb-4">
            <CardHeader>
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                  <AvatarFallback>{reply.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{reply.author}</CardTitle>
                  <p className="text-sm text-gray-500">{reply.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{reply.content}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like ({reply.likes})
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Leave a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Type your reply here..." />
          </CardContent>
          <CardFooter>
            <Button>Post Reply</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
