
import fetch from 'node-fetch'
type CommonsSearch = { query: { pages: Record<string, { images?: { title: string }[] }> } }

export async function commonsImages(title: string) {
  const endpoint = 'https://commons.wikimedia.org/w/api.php'
  const page = await fetch(`${endpoint}?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json&origin=*`).then(r => r.json()) as CommonsSearch
  const imgTitles = Object.values(page.query.pages)[0]?.images?.map(i => i.title) || []
  const titles = imgTitles.slice(0, 8).join('|')
  if (!titles) return [] as { url: string; license?: string; credit?: string }[]
  const info = await fetch(`${endpoint}?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`).then(r => r.json())
  const pages = Object.values(info.query.pages) as any[]
  return pages.map(p => ({ url: p.imageinfo?.[0]?.url, license: p.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value, credit: p.imageinfo?.[0]?.extmetadata?.Artist?.value })).filter(x => x.url)
}
