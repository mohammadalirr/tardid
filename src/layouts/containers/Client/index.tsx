/* eslint-disable react/jsx-no-constructed-context-values */
import { AppShell, Loader, useMantineTheme } from '@mantine/core'
import _ from 'lodash'
import { ReactComponentLike } from 'prop-types'
import React, { useState } from 'react'
import ClientHeaderLayout from './Header'
import Head from 'next/head'
import { MAIN_TITLE } from '~/config/env'
import ClientFooterLayout from './Footer'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'

interface IProps {
  Component: ReactComponentLike
}

const ClientContext = React.createContext<
  {
    stateLayoutLoading: [boolean, (loading: boolean) => void]
  } & any
>({
  stateLayoutLoading: [false, () => {}],
})

/**
 *
 * @param props
 * @returns
 */
function ClientContainer(props: IProps) {
  const { Component } = props

  const stateLayoutLoading = useState(false)
  const [isLayoutLoading] = stateLayoutLoading

  // const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  // // authorize user
  // if (_.isEmpty(userAuth.data)) {
  //   return <VerifyPage loading={userAuth.isFetching} />
  // }

  return (
    <ClientContext.Provider value={{ stateLayoutLoading }}>
      <Head>
        <title>{MAIN_TITLE}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <AppShell
        styles={{
          main: {
          //   overflowX: 'hidden',
            background: 'black',
          //   color: 'black',
          //   margin: '0',
          //   padding: '0'
          },
        }}
        padding='0'
        navbarOffsetBreakpoint="sm"
        // header={<ClientHeaderLayout />}
        //  footer={<ClientFooterLayout />}
      > 
        {isLayoutLoading && <Loader />}
        {/* start render component */}

        <Component {...props} />

        {/* end render component */}
      </AppShell>
    </ClientContext.Provider>
  )
}

export default ClientContainer
