import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../theme'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style jsx global>{`
            html,
            body,
            #__next {
              height: 100%;
            }
            ,
            #main {
              max-width: 1100px;
            }
          `}</style>
          <link rel="shortcut icon" href="/favicon.png" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="description" content="Are you in need of urgent care? Housecall MD is a call away. Let our profesisonals do a home visit. Visit our website for more information." />
          <meta name="keywords" content="health care,health care in Kitsap County,health care in Silverdale Washington,health care in Kitsap County WA,health care in Kitsap County Washington,health care in WA,health care in Washington,health care Kitsap WA,Housecall MD,Housecall MD Kitsap County,Housecall MD Pierce County,Mobile Urgent Care,Housecall,Mobile Medical Care,Urgent Care,Mobile Urgent Care Kitsap County,Housecall Kitsap County,Mobile Medical Care Kitsap County,Urgent Care Kitsap County,Mobile Urgent Care Washington,Housecall Washington,Mobile Medical Care Washington,Urgent Care Washington,Mobile Urgent Care Pierce County,Housecall Pierce County,Mobile Medical Care Pierce County,Urgent Care Pierce County,Mobile Urgent Care Pullman Washington,Housecall Pullman Washington,Mobile Medical Care Pullman Washington,Urgent Care Pullman Washington" />
          <meta prefix="og: http://ogp.me/ns#" property="og:type" content="article" />
          <meta prefix="og: http://ogp.me/ns#" property="og:title" content="Home" />
          <meta prefix="og: http://ogp.me/ns#" property="og:description" content="Are you in need of urgent care? Housecall MD is a call away. Let our profesisonals do a home visit. Visit our website for more information." />
          <meta prefix="og: http://ogp.me/ns#" property="og:url" content="http://www.housecallmd.org/" />
          <meta prefix="article: http://ogp.me/ns/article#" property="article:published_time" content="2019-03-09" />
          <meta prefix="article: http://ogp.me/ns/article#" property="article:modified_time" content="2019-10-09" />
          <meta prefix="og: http://ogp.me/ns#" property="og:site_name" content="Housecall MD" />
          <meta name="twitter:card" content="summary" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-137019806-1`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-137019806-1', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}
