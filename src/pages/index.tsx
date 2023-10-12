import type { InferGetStaticPropsType } from 'next'
import { format, eachDayOfInterval, isWednesday } from 'date-fns'

import { Main } from '@bacondotbuild/ui'

import Layout from '@/components/layout'
import type { Content } from '@/lib/fetchContent'
import fetchContent from '@/lib/fetchContent'

const startDate = new Date(2023, 8, 6)
const today = new Date()
const wednesdays = eachDayOfInterval({
  start: startDate,
  end: today,
}).filter(date => isWednesday(date))

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const dates = wednesdays.slice(0, props?.picks.length ?? wednesdays.length)
  return (
    <Layout>
      <Main className='flex flex-col p-4'>
        <div className='flex flex-grow flex-col items-center space-y-4'>
          <ul className='space-y-4'>
            {props?.picks.map((pick, index) => (
              <li key={pick}>
                {format(dates.at(-1 * (index + 1)) ?? startDate, 'M.d.yy')}
                <div className='text-2xl'>{pick}</div>
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
