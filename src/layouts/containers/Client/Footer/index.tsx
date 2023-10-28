import { Box, Center, Flex, Footer, Grid, Image, Input, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { useMemo } from 'react'
import { ch } from '~/config/common'
import Icon from '~/core/components/Icon/Icon'
import { Button } from '~/core/components/Template'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import useColor from '~/data/query/useColor'
import useMenuHeader from '~/data/query/useMenuHeader'
import useWindowSize from '~/data/query/useWindowSize'

function ClientFooterLayout() {
  const {t, lang} = useTranslate()
  const colors = useColor()
  const queryMenuHeader = useMenuHeader()
  const {isMobile} = useWindowSize();
  const align = isMobile ? 'center' : undefined
  const menus = useMemo(() => queryMenuHeader.items.filter(e => !e.link.includes('products')), [queryMenuHeader.items])
  const half = useMemo(() => menus.length/2,[menus])

  const renderLink = (e: any) => <Link href={e.link}>
      <Text size='md' mb='sm' align={align} color='white'>{e.label}</Text>
  </Link>

  const socials = [
    {
      logo: '/static/images/linkedin.svg',
      link: 'https://linkedin.com/'
    }, {
      logo: '/static/images/instagram.svg',
      link: 'https://instagram.com/'
    }
  ]

  const ways = useMemo(() => [
    {
      icon: 'MarkerPin04',
      title: t('address'),
      text: t('cialk_address'),
      col: 2
    }, {
      icon: 'Phone',
      title: t('phone_number'),
      text: t('cialk_phone_number'),
      col: 1
    }, {
      icon: 'Mail01',
      title: t('email'),
      text: t('cialk_email'),
      col: 1
    }
  ], [t])

  return (
    <Footer pos='relative' bg='primary.9' height={'auto'}>
      <Flex py='3rem' direction='column' align='center' justify='center' bg='primary.7'>
        <Title size='h2' color='white'>{t('join_newsletters')}</Title>
        <Text size='md'>{t('join_newsletters_desc')}</Text>
        <Flex mt='lg' w='fit-content'>
          <Input
            placeholder={t('enter_your_email')}
            styles={{input: {
              background: colors.white,
              height: '100%',
              borderRadius: 0,
              border: 0,
              color: colors.primary,
            }, wrapper: {
              width: 300,
              maxWidth: '60vw'
            }}}
          />
          <Button hideArrow color={colors.white} bg={colors.primary}>
            {t('send')}
          </Button>
        </Flex>
      </Flex>
      <Flex py='3rem'>
        <Grid  w='100vw' px={isMobile ? '2vw' : '7vw'} columns={24}>
          <Grid.Col xs={24} lg={8}>
            <Text size='md'  mb='lg' align={align}>{t('quick_access')}</Text>
            <Grid columns={2}>
              <Grid.Col xs={1}>
                {menus.slice(0, half).map(e => renderLink(e))}
              </Grid.Col>
              <Grid.Col xs={1}>
                {menus.slice(half).map(e => renderLink(e))}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col xs={24} lg={9}>
            <Text size='md' mb='lg' align={align}>{t('contact_ways')}</Text>
            <Grid columns={2}>
              {ways.map(e => <Grid.Col xs={e.col}>
                <Flex align='center' justify={align} gap='md'>
                  <Icon name={e.icon as any} size={26} stroke='white' />
                  <Box>
                    <Text size='sm'>{e.title}</Text>
                    <Text size='md' color='white'>{e.text}</Text>
                  </Box>
                </Flex>
              </Grid.Col>)}
              
            </Grid>
          </Grid.Col>
          <Grid.Col xs={24} lg={7}>
            <Text size='md' mb='lg' align={align}>{t('fllow_us_social')}</Text>
            <Flex gap='xs' justify={align}>
              {socials.map((e: any) => <Link target='_blank' href={e.link} style={{background: ch(colors.white, 8), borderRadius: 10, height: 40, width: 40, padding: 3}}>
                <Image src={e.logo} w={20} h={20} />
              </Link>)}
            </Flex>
            
          </Grid.Col>
        </Grid>
      </Flex>
      <Flex style={{borderTopWidth: 1, borderTopColor: ch(colors.white, 10)}} py='3rem'>
        <Grid align='center' w='100vw' px={isMobile ? '2vw' : '7vw'} columns={12}>
          {!isMobile && <Grid.Col xs={0} lg={1} />}

          <Grid.Col xs={12} lg={3}>
            <Image src='/static/images/logo-light.svg' style={isMobile ? {width: '50%', marginInline: 'auto'} : {width: '100%'}} />
          </Grid.Col>
          {!isMobile && <Grid.Col xs={0} lg={2} />}
          <Grid.Col xs={12} lg={6}>
            <Text size='md' align={align} color='white'>{t('footer_about')}</Text>
          </Grid.Col>
        </Grid>
      </Flex>
      <Center py='lg' style={{borderTopWidth: 1, borderTopColor: ch(colors.white, 10)}}>
        <Text size='sm' color='white' opacity={0.4}>{t('copy_right')}</Text>
      </Center>
    </Footer>
  )
}

export default ClientFooterLayout
