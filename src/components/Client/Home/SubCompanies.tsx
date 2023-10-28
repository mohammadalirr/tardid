import { Box, Flex } from '@mantine/core'
import { SectionHeader } from './SectionHeader'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import {motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity} from 'framer-motion'
import useDataById from '~/data/query/Base/useDataById'
import { getImage, slug } from '~/core/helpers/Formatter'
import { UUID, ch } from '~/config/common'
import useColor from '~/data/query/useColor'
import { useRef } from 'react'
import { wrap } from "@motionone/utils";
import { SubCompanyEntity } from '~/data/entities/SubCompany'
import { Square } from '~/core/components/Template'
import { MyCarousel } from './MyCarousel'
import Router from 'next/router'
import useWindowSize from '~/data/query/useWindowSize'

export function SubCompanies() {
  const {t, lang} = useTranslate()
  const colors = useColor()
  const {data} = useDataById('subCompany', 'list')
  const {isMobile} = useWindowSize();

  return (
    <Box bg='primary.0' w='100vw' py='xl' style={{overflow: 'hidden'}}>
      <Flex maw={1300} mx='auto' px='md' pt='lg'><Square size='60px' /></Flex>
      <SectionHeader
        title={t('cialk_sub_companies')}
        description={t('cialk_sub_companies_desc')}
        link='/subCompanies'
      />
      {data && <MyCarousel
        cards={(data || []).map((e: SubCompanyEntity, idx: number) => {
          return {
            key: slug(e.name[lang]),
            content: <Box w={270} h={180} pos='relative' style={{borderWidth: 1, cursor: 'pointer', borderColor: ch(colors.primary, 20), borderRadius: 8, overflow:'hidden'}}>
              <img src={getImage(e.logo)} style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </Box>
          }
        })}
        height={180}
        width={isMobile ? '100vw' : 1000}
        margin="1rem auto 3rem"
      />}
    </Box>
  )
}