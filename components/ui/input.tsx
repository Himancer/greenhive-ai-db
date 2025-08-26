
import * as React from 'react'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props
  return <input className={`w-full rounded-xl border bg-white/70 px-3 py-2 ${className}`} {...rest} />
}
