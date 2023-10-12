import fetcher from '@/lib/fetcher'

export type Content = {
  list: string[]
}
export default async function fetchContent() {
  return await fetcher<Content>(process.env.CONTENT_URL!)
}
