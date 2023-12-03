import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { globalStyles } from '../styles/global'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
