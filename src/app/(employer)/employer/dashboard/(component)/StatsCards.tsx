import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Eye, TrendingUp } from "lucide-react"

export function StatsCards() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-sm font-semibold">Tổng số ứng viên</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,324</div>
          <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[75%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-sm font-semibold">Tin tuyển dụng</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">+2 tin mới trong tuần</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[45%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-sm font-semibold">Hồ sơ đã xem</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,856</div>
          <p className="text-xs text-muted-foreground">+19% so với tháng trước</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[60%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-sm font-semibold">Tỷ lệ chốt ứng viên</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12.5%</div>
          <p className="text-xs text-muted-foreground">+2.1% so với tháng trước</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[12.5%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

