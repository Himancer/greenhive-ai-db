
'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sprout, Sun, Droplet, Wind, ThermometerSun, MessageCircle, Leaf, Gauge, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import PlantCardImage from '@/components/PlantCardImage'

function Particle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full blur-2xl opacity-30"
      style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(16,185,129,0.3) 35%, rgba(59,130,246,0.2) 70%, transparent 80%)', width: 300, height: 300 }}
      initial={{ scale: 0.8, x: -50, y: -50 }}
      animate={{ scale: [0.8, 1.1, 0.9, 1], x: [-50, 80, -30, 20], y: [-50, 40, 60, -20] }}
      transition={{ duration: 18, repeat: Infinity, delay }}
    />
  )
}

export default function Page() {
  const [q, setQ] = useState('')
  const [petOnly, setPetOnly] = useState(false)
  const [difficulty, setDifficulty] = useState('')
  const [plants, setPlants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const url = `/api/plants?q=${encodeURIComponent(q)}&petSafe=${petOnly}&difficulty=${encodeURIComponent(difficulty)}`
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    setPlants(data.plants || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [q, petOnly, difficulty])

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Particle />
        <Particle delay={4} />
        <Particle delay={8} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.div initial={{ rotate: -12, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 12 }} className="rounded-full p-2 bg-white/70 backdrop-blur border shadow">
            <Sprout className="w-5 h-5 text-emerald-600" />
          </motion.div>
          <div>
            <div className="font-bold text-lg tracking-tight">GreenHive.ai</div>
            <div className="text-xs opacity-60 -mt-1">AI Nursery</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/70">#Plants</Badge>
          <Badge variant="secondary" className="bg-white/70">#Care</Badge>
          <Badge variant="secondary" className="bg-white/70">#PetSafe</Badge>
        </div>
      </header>

      <section className="relative z-10 px-6 pt-6 pb-2">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              A <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">living</span> nursery on your screen
            </h1>
            <p className="mt-4 text-base md:text-lg opacity-80 max-w-prose">Browse plants, learn care in seconds, and filter by pet-safety and difficulty — powered by Postgres.</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                <Input value={q} onChange={e => setQ((e.target as HTMLInputElement).value)} placeholder="Search plants, e.g. snake plant light" className="pl-10" />
              </div>
              <Button variant="secondary" onClick={() => setPetOnly(p => !p)}>
                <PawPrint className="w-4 h-4 mr-2" />{petOnly ? 'Pet-safe ✓' : 'Pet-safe only'}
              </Button>
              <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="rounded-xl border bg-white/70 px-3 py-2">
                <option value="">All difficulty</option>
                <option value="Very Easy">Very Easy</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1800&auto=format&fit=crop" alt="Hero plants" className="w-full h-[300px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-blue-600/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Plant Catalog</h2>
          <div className="text-sm opacity-70">{loading ? 'Loading…' : `${plants.length} result(s)`}</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((p:any) => (
            <div key={p.id} className="group relative overflow-hidden rounded-2xl border bg-white/60 backdrop-blur-md shadow-lg hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 via-blue-200/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="p-4 pb-3">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <Leaf className="w-5 h-5 text-emerald-600" /> {p.commonName}
                </div>
                <div className="text-xs opacity-70 italic">{p.scientific}</div>
              </div>
              <div className="p-4 pt-0">
                <div className="mb-3">
                  <PlantCardImage src={p.images?.[0]?.url || null} alt={p.commonName} />
                </div>
                <p className="text-sm opacity-80 mb-4">{p.summary || ''}</p>
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div><Sun className="w-4 h-4 inline mr-1" />{p.light || '—'}</div>
                  <div><Droplet className="w-4 h-4 inline mr-1" />{p.Droplet || '—'}</div>
                  <div><Wind className="w-4 h-4 inline mr-1" />{p.humidity || '—'}</div>
                  <div><ThermometerSun className="w-4 h-4 inline mr-1" />{p.temperature || '—'}</div>
                </div>
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-emerald-600/90 text-white">{p.difficulty || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 px-6 py-10 text-sm opacity-70">
        GreenHive.ai • Next.js + Prisma + Postgres • Deploy on Vercel.
      </footer>
    </div>
  )
}
