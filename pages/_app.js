import { useEffect, useState, Fragment } from 'react'
import { Auth } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'
import { useRouter } from 'next/router'
import './styles.css'

import Head from 'next/head'
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'

import Layout from '../components/Layout'

const generateClassName = createGenerateClassName()

export default function MyApp(props) {
  const { Component, pageProps, router } = props
  const nextRouter = useRouter()

  useEffect(() => {
    const path = router.asPath
    const paramIndex = path.indexOf('#')
    if (paramIndex !== -1) {
      const params = path.substring(paramIndex + 1).split('&')
      let obj = {}
      params.forEach((param) => {
        const arr = param.split('=')
        console.log('arr', arr)
        obj[arr[0]] = arr[1]
      })

      nextRouter.push({
        pathname: '/reset-password/[access_token]',
        query: { access_token: obj.access_token },
      })
    }
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
          <Auth.UserContextProvider supabaseClient={supabase}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth.UserContextProvider>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  )
}
