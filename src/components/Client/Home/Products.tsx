import { Box, Grid, Title } from '@mantine/core'
import { SectionHeader } from '~/components/Client/Home/SectionHeader'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import {motion} from 'framer-motion'
import useDataById from '~/data/query/Base/useDataById'
import { getImage } from '~/core/helpers/Formatter'
import { ch } from '~/config/common'
import useColor from '~/data/query/useColor'
import { ProductEntity } from '~/data/entities/Product'
import { useEffect, useMemo, useState } from 'react'
import Icon from '~/core/components/Icon/Icon'
import useWindowSize from '~/data/query/useWindowSize'
import Router from 'next/router'

export function Products() {
  const {t, lang, isRtl} = useTranslate()
  const colors = useColor()
  const {data} = useDataById('product', 'list')
  const [p, setP] = useState<any>({})
  const {isMobile} = useWindowSize();


  const item = {
    initial: { borderBottomWidth: 1, borderBottomColor: ch(colors.primary, 20) },
    animate: { borderBottomWidth: 2, borderBottomColor: ch(colors.primary, 40), transition: {
      duration: .2,
      ease: "easeIn"
    } },
  }  

  const icon = {
    initial: { opacity: 0 },
    animate: { opacity: .7, transition: {
      duration: .2,
      ease: "easeIn"
    } },
  }  

  useEffect(() => {
    if (data && data?.length !== 0) {
      setP(data[0])
    }
  }, [data])

  const styleT = useMemo(() => ({
    left: isMobile ? -50 : -100,
    top: isMobile ? -100 : -100,
    width: isMobile ? 200 : 300,
    height: isMobile ? 220 : 320,
    position: 'absolute'
  } as any), [isMobile])

  const styleB = useMemo(() => ({
    left: isMobile ? 50 : 50,
    width: isMobile ? 220 : 320,
    height: isMobile ? 200 : 300,
    position: 'relative'
  } as any), [isMobile])

  return (
    <Box w='100vw' bg='white' py='3rem' style={{overflow: 'hidden'}}>
      <SectionHeader title={t('cialk_products')} link='/products' />
      <Grid columns={12} mt={isMobile ? 0 : '3rem'} align='center' maw={1300} px='md' mx='auto'>
        <Grid.Col xs={12} lg={6}>
          <motion.ul
            style={{display: 'flex', width: '100%', flexDirection: 'column', overflowX: 'scroll', gap: '1.5rem', paddingInline: '1rem', marginBlock: '2rem', maxWidth: '1300px', marginInline: 'auto', height: 400, overflowY: 'hidden'}}
          >
            {(data || []).slice(0, 5).map((e: ProductEntity, idx: number) => {
              return <motion.li
                onClick={() => Router.push('/products/'+e.id)}
                key={idx}
                style={{listStyle: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}
                variants={item}
                onHoverStart={() => setP(e)}
                initial="initial"
                animate="initial"
                whileHover="animate"
              >
                <Title size='h4' mb='xs' color={colors.primary}>{idx+1}. {e.name[lang]}</Title>
                <motion.div variants={icon}>
                  <Icon name={isRtl ? 'ArrowLeft' : 'ArrowRight'} stroke={colors.primary} />
                </motion.div>
              </motion.li>
            })}
          </motion.ul>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}  pb={isMobile ? '3rem' : 0}>
          <div style={{position: 'relative', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <motion.div variants={icon} style={{position: 'relative', width: 'auto'}}>
              <img src={getImage((p.images || [])[0])} className='shadow-img' style={styleT}  />
              <img src={getImage((p.images || [])[1])} className='shadow-img' style={styleB} />
            </motion.div>
          </div>
        </Grid.Col>
      </Grid>
    </Box>
  )
}