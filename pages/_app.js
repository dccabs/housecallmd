import { useEffect, Fragment } from 'react'
import { Auth } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'


import Head from 'next/head'
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Auth0Provider } from '@auth0/auth0-react'
import theme from '../theme'

import Layout from '../components/Layout'

const generateClassName = createGenerateClassName()

export default function MyApp(props) {
  const { Component, pageProps } = props

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <title>House Call MD</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
            redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
          >
            <Auth.UserContextProvider supabaseClient={supabase}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            </Auth.UserContextProvider>
          </Auth0Provider>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  )
}
