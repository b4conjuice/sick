import type { InferGetStaticPropsType } from 'next'

import { Main } from '@bacondotbuild/ui'

import Layout from '@/components/layout'
import type { Content } from '@/lib/fetchContent'
import fetchContent from '@/lib/fetchContent'

export default function Bank(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title='sick bank'>
      <Main className='flex flex-col p-4'>
        <div className='flex flex-grow flex-col space-y-4'>
          <ul className='space-y-4'>
            {props?.picks.map((pick, index) => {
              const text = typeof pick === 'string' ? pick : pick?.text
              const url = typeof pick === 'string' ? null : pick?.url
              return (
                <li key={index}>
                  <div className='text-2xl'>
                    {url ? (
                      <a
                        className='text-cb-pink hover:underline'
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data: Content = await fetchContent(process.env.BANK_URL!)
  return {
    props: {
      picks: data.list.map(item => {
        const [text, url] = item.split('\t')
        if (url)
          return {
            url,
            text,
          }
        else return text
      }),
    },
    revalidate: 1,
  }
}
