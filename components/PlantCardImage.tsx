
'use client'
import Image from 'next/image'
import { useState } from 'react'
export default function PlantCardImage({ src, alt }: { src?: string | null; alt: string }) {
  const [ok, setOk] = useState(true)
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-sky-100">
      {ok && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
          onError={() => setOk(false)}
          priority={false}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-emerald-700 font-semibold">
          {alt.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase()}
        </div>
      )}
    </div>
  )
}
