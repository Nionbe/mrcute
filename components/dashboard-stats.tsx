import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const statCardVariants = cva("rounded-lg border p-4 shadow-sm transition-all hover:shadow", {
  variants: {
    variant: {
      default: "bg-card",
      primary: "bg-primary-50 border-primary-100",
      secondary: "bg-secondary-50 border-secondary-100",
      success: "bg-green-50 border-green-100",
      warning: "bg-amber-50 border-amber-100",
      danger: "bg-red-50 border-red-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, variant, className }: StatCardProps) {
  const iconColorMap = {
    default: "text-gray-500 bg-gray-100",
    primary: "text-primary-600 bg-primary-100",
    secondary: "text-secondary-600 bg-secondary-100",
    success: "text-green-600 bg-green-100",
    warning: "text-amber-600 bg-amber-100",
    danger: "text-red-600 bg-red-100",
  }

  const iconColor = iconColorMap[variant || "default"]

  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className={cn("rounded-full p-2", iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {trend && (
          <span className={cn("ml-2 text-xs font-medium", trend.isPositive ? "text-green-600" : "text-red-600")}>
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  )
}

interface DashboardStatsProps {
  stats: StatCardProps[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function DashboardStats({ stats, columns = 4, className }: DashboardStatsProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn(`grid gap-4 ${gridCols[columns]}`, className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
