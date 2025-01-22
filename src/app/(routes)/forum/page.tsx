import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Eye, PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'

const forumCategories = [
  { id: 'all', name: 'All Topics' },
  { id: 'career-advice', name: 'Career Advice' },
  { id: 'job-search', name: 'Job Search' },
  { id: 'interview-tips', name: 'Interview Tips' },
  { id: 'industry-news', name: 'Industry News' },
]

const forumPosts = [
  {
    id: 1,
    title: 'Tips for negotiating salary as a junior developer',
    author: 'Alice Johnson',
    category: 'Career Advice',
    replies: 15,
    views: 230,
    likes: 42,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'How to prepare for a technical interview at FAANG companies',
    author: 'Bob Smith',
    category: 'Interview Tips',
    replies: 28,
    views: 512,
    likes: 76,
    timestamp: '1 day ago',
  },
  {
    id: 3,
    title: 'The impact of AI on the job market: opportunities and challenges',
    author: 'Charlie Brown',
    category: 'Industry News',
    replies: 37,
    views: 789,
    likes: 103,
    timestamp: '3 days ago',
  },
]

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-[#f5e6da]">
      {/* Navigation (reuse from job board) */}
      {/* ... */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Forum</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {forumCategories.map((category) => (
                  <Button key={category.id} variant="ghost" className="w-full justify-start">
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search forum topics..."
                className="pl-10 pr-4 py-2 bg-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Forum Tabs */}
            <Tabs defaultValue="recent" className="w-full">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
              <TabsContent value="recent">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="mb-4">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            <Link href={`/forum/post/${post.id}`} className="hover:text-red-500">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            Posted by {post.author} • {post.timestamp}
                          </p>
                        </div>
                        <Badge>{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <span className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {post.replies} replies
                        </span>
                        <span className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          {post.views} views
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          {post.likes} likes
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="popular">
                {/* Populate with popular posts */}
                <p>Popular posts will be displayed here.</p>
              </TabsContent>
              <TabsContent value="unanswered">
                {/* Populate with unanswered posts */}
                <p>Unanswered posts will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

