"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  title: string
  badge?: number
}

function SidebarItem({ href, icon: Icon, title, badge }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-primary-700 font-medium" : "text-muted-foreground",
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-primary-600" : "text-gray-400")} />
      <span>{title}</span>
      {badge ? (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
          {badge}
        </span>
      ) : null}
    </Link>
  )
}

interface EnhancedSidebarProps {
  items: {
    title: string
    href: string
    icon: LucideIcon
    badge?: number
  }[]
  className?: string
}

export function EnhancedSidebar({ items, className }: EnhancedSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {items.map((item) => (
              <SidebarItem key={item.href} href={item.href} icon={item.icon} title={item.title} badge={item.badge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
