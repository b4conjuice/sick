import type { InferGetStaticPropsType } from 'next'

import { Main } from '@bacondotbuild/ui'

import Layout from '@/components/layout'
import type { Content } from '@/lib/fetchContent'
import fetchContent from '@/lib/fetchContent'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Main className='flex flex-col p-4'>
        <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
          <ul className='space-y-4'>
            {props?.picks.map(pick => (
              <li key={pick} className='text-2xl'>
                {pick}
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data: Content = await fetchContent()
  return {
    props: {
      picks: data.list,
    },
    revalidate: 1,
  }
}
