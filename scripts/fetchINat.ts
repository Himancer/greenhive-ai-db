
import fetch from 'node-fetch'
export async function iNatImages(scientific: string) {
  const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientific)}&photos=true`
  const res = await fetch(url).then(r => r.json())
  const t = res.results?.[0]
  const photos = (t?.default_photo ? [t.default_photo] : t?.photos || [])
  const allowed = new Set(['cc0', 'cc-by'])
  return photos?.filter((p:any) => allowed.has(String(p.license_code || '').toLowerCase()))?.map((p:any) => ({ url: p.medium_url || p.url, license: p.license_code, credit: p.attribution })) || []
}
