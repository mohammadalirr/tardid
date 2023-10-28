import { Box, Flex, Title, Text } from '@mantine/core'
import { SectionHeader } from './SectionHeader'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import {motion} from 'framer-motion'
import useDataById from '~/data/query/Base/useDataById'
import { ActivityAreaEntity } from '~/data/entities/ActivityArea'
import useColor from '~/data/query/useColor'
import { getImage } from '~/core/helpers/Formatter'
import { ch } from '~/config/common'
import { useMediaQuery } from '@mantine/hooks'
import useWindowSize from '~/data/query/useWindowSize'

export function ActivityAreas() {
  const {t, lang} = useTranslate()
  const {data} = useDataById('activityArea', 'list')
  const colors = useColor()
  const {isMobile} = useWindowSize();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const item_ = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    }
  }

  const item_2 = {
    initial: { opacity: 0, display: 'none' },
    animate: {
      opacity: 1, display: 'block',
      transition: {
        duration: 0.7,
      }
    }
  }

  return (
    <Box w='100vw' bg='white' py='3rem'>
      <SectionHeader hideShowMore title={t('activity_areas')} />
        <Box className='activity-box' style={{overflowX: 'scroll', marginInline: 'auto', width: isMobile ? '100vw' : 1300}}>
          <motion.div
            variants={container} initial='hidden' {...(isMobile ? {animate: 'visible'} : {whileInView:'visible'})}
            style={{display: 'flex', overflowX: 'scroll', gap: '1.5rem', paddingInline: '1rem', marginBlock: '2rem', width: 'fit-content', marginInline: 'auto', height: 400, overflowY: 'hidden'}}
          >
            {(data || []).slice(0, 5).map((e: ActivityAreaEntity, idx: number) => {
              return <motion.div
                key={idx}
                style={{listStyle: 'none', flex: 1, width: 300, height: 400, position: 'relative'}}
                variants={item_}
                
              >
                <motion.div whileHover="animate" whileFocus='animate' style={{background: ch(colors.primary, 70), padding: '1rem', display: 'flex', height: '100%', width: '100%', position: 'absolute', zIndex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <Title color='white' size='h4' mb='xs'>{e.title[lang]}</Title>
                  <motion.div variants={item_2} style={{display: 'none', opacity: 0}}>
                    <Text>{e.description[lang]}</Text>
                  </motion.div>
                </motion.div>
                <img src={getImage(e.image)} style={{position: 'absolute', width: '100%', height: '100%'}} />

              </motion.div>
            })}
          </motion.div>
        </Box>
    </Box>
  )
}