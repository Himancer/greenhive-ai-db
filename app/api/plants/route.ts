export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  const petSafe = searchParams.get('petSafe')
  const diff = searchParams.get('difficulty')

  const where: any = {}
  if (q) {
    where.OR = [
      { commonName: { contains: q, mode: 'insensitive' } },
      { scientific: { contains: q, mode: 'insensitive' } },
      { summary: { contains: q, mode: 'insensitive' } },
      { tags: { some: { tag: { contains: q, mode: 'insensitive' } } } },
    ]
  }
  if (petSafe === 'true') where.petSafe = true
  if (diff) where.difficulty = diff

  const plants = await prisma.plant.findMany({
    where,
    include: { images: { take: 1 }, tags: true },
    orderBy: { commonName: 'asc' }
  })

  return NextResponse.json({ plants })
}
