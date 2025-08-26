
import * as React from 'react'
export function Card({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-2xl border bg-white/70 backdrop-blur shadow ${className}`}>{children}</div>
}
export function CardHeader({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
export function CardTitle({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>
}
export function CardContent({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-4 pt-0 ${className}`}>{children}</div>
}
