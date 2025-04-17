"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

const applications = [
  {
    id: "APP-1234",
    name: "Sarah Johnson",
    position: "Senior Software Engineer",
    date: "2023-04-05",
    status: "Interviewed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "APP-1235",
    name: "Michael Chen",
    position: "Product Manager",
    date: "2023-04-04",
    status: "Reviewing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "APP-1236",
    name: "Emily Rodriguez",
    position: "UX Designer",
    date: "2023-04-03",
    status: "Rejected",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "APP-1237",
    name: "David Kim",
    position: "Data Analyst",
    date: "2023-04-02",
    status: "Reviewing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "APP-1238",
    name: "Jessica Taylor",
    position: "Marketing Specialist",
    date: "2023-04-01",
    status: "Interviewed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentApplications() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Applicant</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={application.avatar} alt={application.name} />
                  <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{application.name}</div>
                  <div className="text-xs text-muted-foreground">{application.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{application.position}</TableCell>
            <TableCell>{application.date}</TableCell>
            <TableCell>
              <Badge
                variant={
                  application.status === "Interviewed"
                    ? "default"
                    : application.status === "Reviewing"
                      ? "outline"
                      : "destructive"
                }
                className="flex w-fit items-center gap-1"
              >
                {application.status === "Interviewed" ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : application.status === "Reviewing" ? (
                  <Clock className="h-3 w-3" />
                ) : (
                  <XCircle className="h-3 w-3" />
                )}
                {application.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

