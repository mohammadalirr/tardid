import { Box, Flex, Grid, Title } from '@mantine/core'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import {useInView} from 'framer-motion'
import useColor from '~/data/query/useColor'
import { useMemo, useRef } from 'react'
import CountUp from 'react-countup';
import { ch } from '~/config/common'
import Icon from '~/core/components/Icon/Icon'
import { useMediaQuery } from '@mantine/hooks'
import useWindowSize from '~/data/query/useWindowSize'

export function Statistics() {
  const {t, lang} = useTranslate()
  const colors = useColor()
  const ref = useRef(null)
  const isInView = useInView(ref)
  const {isMobile} = useWindowSize();
  const data = useMemo(() => [
    {
      title: t('customer_satisfaction'),
      value: 97,
      icon: 'ThumbsUp'
    }, {
      title: t('manpower'),
      value: 80,
      icon: 'Users01'
    }, {
      title: t('work_experience'),
      value: 100,
      icon: 'Award01'
    }, {
      title: t('completed_projects'),
      value: 121,
      icon: 'CheckCircleBroken'
    }
  ], [lang, t])

  return (
    <Box w='100vw' bg='white' py='3rem' style={{overflow: 'hidden'}}>
      <Grid columns={8} maw={1300} mx={isMobile ? 'lg' : 'auto'}>
        {data?.map((e: any, idx: number) => {
          return <Grid.Col span={isMobile ? 4 : 2} key={idx}>
            <Flex direction='column' justify='center' align='center' w='100%' pos='relative' style={{borderWidth: 1, aspectRatio: 1, borderColor: ch(colors.primary, 50)}}>
              <Icon name={e.icon} stroke={colors.primary} size="50px" style={{marginBottom: '1rem'}} />
              <CountUp  end={e.value}>
                {({ countUpRef, start }) => (<>
                  <div style={{color: colors.primary, fontSize: isMobile ? '2rem' : '2.5rem'}}><span ref={countUpRef} /><span style={{opacity: 0.5, top: -5, position: 'relative', marginRight: '0.5rem'}}>+</span></div>
                  {isInView && start()}
                </>)}
              </CountUp>
              <Title size={isMobile ? 'h4' : 'h3'} mt={{main:'xs', lg: 'xl'}} color='primary.7' align='center'>{e.title}</Title>
            </Flex>
          </Grid.Col>
        })}
      </Grid>
    </Box>
  )
}