
import * as React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary' }
export function Button({ className = '', variant = 'default', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium shadow transition'
  const theme = variant === 'secondary' ? 'border bg-white/70 hover:bg-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
  return <button className={`${base} ${theme} ${className}`} {...props} />
}
export default Button
