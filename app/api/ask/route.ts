
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { q } = await req.json()
  const query = String(q || '').toLowerCase()

  const plants = await prisma.plant.findMany({ include: { images: { take: 1 } } })
  const plant = plants.find(p =>
    query.includes(p.commonName.toLowerCase().split(' ')[0]) ||
    query.includes(p.scientific.toLowerCase()) ||
    query.includes(p.commonName.toLowerCase())
  )

  if (!plant) {
    const names = plants.slice(0, 12).map(p=>p.commonName).join(', ')
    return NextResponse.json({ answer: `I can help with ${names}. Ask e.g. "How much water for Monstera?"` })
  }

  const t: any = plant
  const pick = (m: Record<string, any>, keys: string[]) => keys.map(k => `${k}: ${m[k] ?? 'n/a'}`).join(' | ')
  if (/(water|watering|thirst)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} — Water: ${t.water || 'n/a'}.` })
  if (/(light|sun)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} — Light: ${t.light || 'n/a'}.` })
  if (/(humidity|humid)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} — Humidity: ${t.humidity || 'n/a'}.` })
  if (/(soil|mix|potting)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} — Soil: ${t.soil || 'n/a'}.` })
  if (/(temp|temperature|cold|heat)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} — Temperature: ${t.temperature || 'n/a'}.` })
  if (/(toxic|poison|pet|cat|dog)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} — ${t.petSafe ? 'Pet-safe ✅' : (t.toxic ? 'Toxic to pets ⚠️' : 'Unknown')}` })
  if (/(care|guide|all|summary|info|about|details)/.test(query)) return NextResponse.json({ answer: `${plant.commonName} care — ${pick(t as any, ['light','water','humidity','soil','temperature','difficulty'])}` })
  return NextResponse.json({ answer: `For ${plant.commonName}, I can tell you about light, water, humidity, soil, temperature, toxicity, pet safety, and difficulty.` })
}
