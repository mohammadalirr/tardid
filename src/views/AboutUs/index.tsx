import { Box, Flex, Grid, Image, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {motion} from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { SectionHeader } from '~/components/Client/Home/SectionHeader'
import { ch } from '~/config/common'
import { Dots, Square } from '~/core/components/Template'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import useDataById from '~/data/query/Base/useDataById'
import useColor from '~/data/query/useColor'
import useWindowSize from '~/data/query/useWindowSize'

export function AboutUsPage() {
  const {t, isRtl} = useTranslate()
  const colors = useColor()
  const {isMobile} = useWindowSize();

  const item = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: {
      duration: .2,
      ease: "easeIn"
    } },
  }

  const list = [
    {
      title: t('cialk_vision'),
      items: t('cialk_vision_desc')?.split('_') || []
    }, {
      title: t('cialk_mission'),
      items: t('cialk_mission_desc')?.split('_') || []
    }, {
      title: t('cialk_value'),
      items: t('cialk_value_desc')?.split('_') || []
    }
  ]

  const explains = [
    {
      image: '/static/images/aboutUs1.png',
      text: t('about_us_1')
    }, {
      image: '/static/images/aboutUs2.png',
      text: t('about_us_2')
    }, {
      image: '/static/images/aboutUs3.png',
      text: t('about_us_3')
    }
  ]

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        
        delayChildren: 0.4,
        staggerChildren: 0.3
      }
    }
  }
    
  const item_ = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      }
    }
  }

  return (
    <Box w='100vw' bg='white' pt={isMobile ? 100 : 200} style={{overflow: 'hidden'}}>
      <SectionHeader
        title={t('about_us')}
        leftComponent={<Dots size={100} color={colors.primary} />}
        description={t('about_us_desc')}
      />
      <Box maw={1300} px='xl' mx='auto' pos='relative'>
        <Grid columns={12} mt='1rem' align='center'>
          <Grid.Col xs={11} lg={5}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'keyframes',
                duration: 2,
              }}
              style={{position: 'relative', width: '100%', justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
                <img src={'/static/images/aboutUs0.png'} style={{height: 'fit-content', marginRight: isMobile? -20: -100, position: 'relative',}}  />
            </motion.div>
          </Grid.Col>
          <Grid.Col xs={12} lg={5}>
            <motion.div variants={container} initial='hidden' animate='visible' style={{width: '100%'}}>
              <Flex direction='column' gap='xl'>
                {list.map(e => <motion.div variants={item_} key={e.title}>
                  <Title color='primary' size='h1' mb='md'>{e.title}</Title>
                  {e.items.map((txt: string, idx: number) => <Flex key={idx} gap='xs' mb='xs'>
                    <Box h='0.5rem' w='0.5rem' bg='primary' mt='0.5rem' style={{borderRadius: 100}} />
                    <Text color='primary' style={{flex: 1}}>{txt}</Text>
                  </Flex>)}
                </motion.div>)}
              </Flex>
            </motion.div>
          </Grid.Col>
        </Grid>
        

        <Flex direction='column' mt='8rem' gap='5rem' mb='10rem'>
          <Flex dir='ltr'>
            {isRtl ? <Square size={'90px'} mt='2rem'  pos='absolute' right={0} flipX color={ch(colors.primary, 50)} border={5} />
            : <Square size={'90px'} mt='2rem' pos='absolute' right={0} flipX color={ch(colors.primary, 50)} border={5} />}
          </Flex>
          {explains.map((e, ix) => <Grid align='center' columns={24} key={ix}>
            <Grid.Col xs={0} lg={2} />
            <Grid.Col xs={24} lg={7}>
              <Image src={e.image} className='shadow-img' style={{aspectRatio: 1.831, width: 392, marginInline: 'auto'}} />
            </Grid.Col>
            <Grid.Col xs={0} lg={2} />
            <Grid.Col xs={24} lg={11}>
              <Text color='primary' align={isMobile ? 'center' : undefined} style={{flex: 1}}>{e.text}</Text>
            </Grid.Col>
            <Grid.Col xs={0} lg={2} />
          </Grid>)}
        </Flex>
        <Square dir='bottom' size={'90px'} pos='absolute' flipX left={0} bottom={'-6rem'} color={ch(colors.primary, 50)} border={5} />

      </Box>
      <Image src='/static/images/stone.png' />
    </Box>
  )
}

export default AboutUsPage
