
import { PrismaClient } from '@prisma/client'
import { commonsImages } from './fetchCommons'
import { iNatImages } from './fetchINat'

const prisma = new PrismaClient()

async function upsertPlant(input: {
  commonName: string; scientific: string; summary?: string; traits?: Partial<{
    light: string; water: string; humidity: string; soil: string; temperature: string; difficulty: string; petSafe: boolean; toxic: boolean;
  }>;
}) {
  const { commonName, scientific } = input
  const [cImgs, nImgs] = await Promise.all([ commonsImages(scientific), iNatImages(scientific) ])
  const imgs = [...cImgs, ...nImgs].slice(0, 6)

  await prisma.plant.upsert({
    where: { scientific },
    update: {
      commonName, summary: input.summary, ...input.traits,
      images: { deleteMany: {}, create: imgs.map(i => ({ url: i.url, license: i.license, credit: i.credit, source: i.url.includes('wikimedia') ? 'wikimedia' : 'inaturalist' })) },
      sources: { deleteMany: {}, create: [
        { label: 'Wikipedia', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(scientific)}` },
        { label: 'Wikimedia Commons', url: `https://commons.wikimedia.org/wiki/${encodeURIComponent(scientific)}` },
      ]}
    },
    create: {
      commonName, scientific, summary: input.summary, ...input.traits,
      images: { create: imgs.map(i => ({ url: i.url, license: i.license, credit: i.credit, source: i.url.includes('wikimedia') ? 'wikimedia' : 'inaturalist' })) },
      sources: { create: [
        { label: 'Wikipedia', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(scientific)}` },
        { label: 'Wikimedia Commons', url: `https://commons.wikimedia.org/wiki/${encodeURIComponent(scientific)}` },
      ]}
    }
  })
}

async function main() {
  await upsertPlant({ commonName: 'Monstera Deliciosa', scientific: 'Monstera deliciosa', summary: 'Iconic split leaves; fast indoor grower.', traits: { light: 'Bright, indirect', water: 'Let top 2–3 cm dry', difficulty: 'Easy', petSafe: false, toxic: true } })
  await upsertPlant({ commonName: 'Snake Plant', scientific: 'Dracaena trifasciata', summary: 'Tough, tolerant of low light.', traits: { light: 'Low to bright, indirect', water: 'Low; dry soil fully', difficulty: 'Very Easy', petSafe: false, toxic: true } })
  await upsertPlant({ commonName: 'Golden Pothos', scientific: 'Epipremnum aureum', summary: 'Forgiving trailing vine; quick grower.', traits: { light: 'Low–Bright, indirect', water: 'Dry top 2–4 cm', difficulty: 'Easy', petSafe: false, toxic: true } })
  await upsertPlant({ commonName: 'Areca Palm', scientific: 'Dypsis lutescens', summary: 'Feathery fronds; pet-friendly.', traits: { light: 'Bright, filtered', water: 'Evenly moist', difficulty: 'Medium', petSafe: true, toxic: false } })
  await upsertPlant({ commonName: 'Peace Lily', scientific: 'Spathiphyllum wallisii', summary: 'Elegant white spathes; loves humidity.', traits: { light: 'Medium, indirect', water: 'Keep slightly moist', difficulty: 'Easy', petSafe: false, toxic: true } })
}

main().then(()=>console.log('Seed complete')).catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
