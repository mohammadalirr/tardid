
// import '../styles/globals.css';
import '../css/reset.css';
import '../css/main.css';
import '../css/glass.css';
import '../css/gallery.css';
import '../css/ticket-page.css';
import '../css/pardakht.css';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import _ from 'lodash'
import NextApp, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'
import { MAIN_TITLE } from '~/config/env'
import { RouterTransition } from '~/core/components/RouterTransition'
import getSiteLayout from '~/layouts/core'
import rtlPlugin from 'stylis-plugin-rtl';
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate';
import { useLocalStorage } from '@mantine/hooks';
import Router, { useRouter } from 'next/router';

// if (typeof window !== 'undefined') {
//   window.React = React
// }

const brand = _.toLower(slugify(MAIN_TITLE))
const cookieName = `${brand}-color-scheme`

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)
  const [lang, setLang] = useLocalStorage({key: 'lang'})
  const route = useRouter()
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
  }

  const siteLayout = getSiteLayout(props)
  const myCacheRtl = createEmotionCache({ key: "mantine", stylisPlugins: [rtlPlugin] , prepend: false });
  const myCache = createEmotionCache({ key: "mantine", stylisPlugins: [], prepend: false });

  useEffect(() => {
    setTimeout(() => {
      if (!lang || lang === 'undefined') {
        const l = 'fa'
        setLang(l)
      }
    }, 2000);
  }, [])

  return (
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <Head>
        <title>{MAIN_TITLE}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ 
            colorScheme,
            dir: lang === 'fa' ? 'rtl' : 'ltr',
            fontFamily: 'Vazirmatn',
            colors: {
              primary: ['#F3F3F4', '#F3F3F4', '#F3F3F4', '#E7E8E9', '#D0D1D4', '#A1A4A9', '#71767E', '#424953', '#2A313D', '#131B28'],
              secondary: ['#FAF2D7', '#FAF2D7', '#FAF2D7', '#F6E5B0', '#F1D888', '#EDCB61', '#E8BE39', '#D1AB33', '#BA982E', '#745F1D'],
            },
            primaryColor: 'secondary',
          }}
          withGlobalStyles
          withNormalizeCSS
          emotionCache={lang === 'fa' ? myCacheRtl : myCache}
        >
          {/* nprogress loader */}
          <RouterTransition />

          {/* notification provider */}
          <Notifications position="top-right" zIndex={2077} />

          {/* modal provider */}
          <ModalsProvider>
            {/* render site layout */}
            {siteLayout}
            {/* render site layout */}
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return {
    ...appProps,
    colorScheme: 'dark',
  }
}
