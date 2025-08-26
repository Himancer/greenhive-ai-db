
import * as React from 'react'
type Props = React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'secondary' | 'outline' }
export function Badge({ className = '', variant = 'default', ...props }: Props) {
  const theme = variant === 'secondary' ? 'bg-white/70 border' : variant === 'outline' ? 'border' : 'bg-emerald-600 text-white'
  return <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${theme} ${className}`} {...props} />
}
