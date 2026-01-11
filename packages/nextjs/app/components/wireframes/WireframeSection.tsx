"use client"

import { cn } from "@/utils/cn"
import type { ReactNode } from "react"

interface WireframeSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * A styled section container for wireframe demos.
 */
export function WireframeSection({
  title,
  description,
  children,
  className,
}: WireframeSectionProps) {
  return (
    <section
      className={cn(
        "p-6 rounded-2xl",
        "bg-card border border-border",
        "shadow-sm",
        className
      )}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
