"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react"

interface KYCStatsProps {
  totalSubmissions: number
  pendingReview: number
  approved: number
  rejected: number
  approvalRate: number
  averageReviewTime: string
}

export function KYCStats({
  totalSubmissions,
  pendingReview,
  approved,
  rejected,
  approvalRate,
  averageReviewTime,
}: KYCStatsProps) {
  const completedReviews = approved + rejected
  const completionRate = totalSubmissions > 0 ? (completedReviews / totalSubmissions) * 100 : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Review Progress</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completedReviews}/{totalSubmissions}
          </div>
          <Progress value={completionRate} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">{completionRate.toFixed(1)}% completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{approvalRate}%</div>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="default" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              {approved} approved
            </Badge>
            <Badge variant="destructive" className="text-xs">
              <XCircle className="h-3 w-3 mr-1" />
              {rejected} rejected
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Review Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageReviewTime}</div>
          <p className="text-xs text-muted-foreground mt-2">{pendingReview} submissions pending</p>
        </CardContent>
      </Card>
    </div>
  )
}
