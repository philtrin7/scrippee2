import * as React from 'react'
import Head from 'next/head'
import { Header } from './Header'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title'
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Scrippee 2.0 - Customer Management Tool"
      />
      <script src="../static/js/eva.min.js"></script>
    </Head>
    <Header />
    {children}
  </div>
)

export default Layout
