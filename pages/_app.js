import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { UberProvider } from '../context/uberContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <UberProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </UberProvider>
  )
}

export default MyApp
