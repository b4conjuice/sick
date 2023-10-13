import Link from 'next/link'
import { useRouter } from 'next/router'

import { Header, Page } from '@bacondotbuild/ui'

import Meta from '@/components/meta'

const DEFAULT_TITLE = 'sick'

const Layout = ({
  title = DEFAULT_TITLE,
  children,
  headerTitle,
  headerUrl,
}: {
  title?: string
  children: React.ReactNode
  headerTitle?: string
  headerUrl?: string
}) => {
  const { pathname } = useRouter()
  const header = headerTitle ?? title
  return (
    <Page>
      <Meta
        title={title === DEFAULT_TITLE ? title : `${title} - ${DEFAULT_TITLE}`}
      />
      <Header>
        {headerUrl ? (
          <Link href={headerUrl}>{header}</Link>
        ) : pathname === '/' ? (
          <span>{header}</span>
        ) : (
          <Link href='/'>{header}</Link>
        )}
      </Header>
      {children}
    </Page>
  )
}

export default Layout
