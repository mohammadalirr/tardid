import { Accordion, Box, Flex, Grid, Image, LoadingOverlay, Tabs, Title, UnstyledButton } from '@mantine/core'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import useDataById from '~/data/query/Base/useDataById'
import useColor from '~/data/query/useColor'
import { useEffect, useMemo, useState } from 'react'
import useWindowSize from '~/data/query/useWindowSize'
import { SectionHeader } from '~/components/Client/Home/SectionHeader'
import { useRouter } from 'next/router'
import { ProductEntity } from '~/data/entities/Product'
import { getImage } from '~/core/helpers/Formatter'
import useStyles from '~/data/query/useStyles'
import { e2p } from '~/utils/common'

function ProductDetails() {
  const {t, lang, isRtl} = useTranslate()
  const {query} = useRouter()
  
  const colors = useColor()
  const styles = useStyles()

  const {data, refetch} = useDataById('product', (query as any)?.id) as {data: ProductEntity, refetch: () => void}
  const [image, setImage] = useState<string>('')
  const {isMobile} = useWindowSize();

  useEffect(() => {
    if (data) {
      setImage(data.images[0])
    }
  }, [data])

  const tab1 = useMemo(()=> [
    {
        title: t('characteristics'),
        content: <Box style={{color: colors.primary}}>
            <div dangerouslySetInnerHTML={{__html: (data?.characteristics || {})[lang] || '<div></div>'}} />
        </Box>
    },
    // {
    //     title: t('comments')
    // }
  ], [data, t])

  const tab2 = useMemo(()=> [
    {
        title: t('description'),
        content: <Box style={{color: colors.primary}}>
            <div dangerouslySetInnerHTML={{__html: (data?.description || {})[lang] || '<div></div>'}} />
        </Box>
    }, {
        title: t('faq'),
        content: <div>
            {data?.faq && (data?.faq || {})[lang] && <Accordion styles={{
                    ...styles.accordion,
                    
                }}>
                {((data?.faq || {})[lang] || []).map((item: any, idx: number) => (
                    <Accordion.Item style={{color: colors.primary}} key={item.question} value={item.question}>
                        <Accordion.Control><Title size='h3'>{e2p(idx+1)}. {item.question}</Title></Accordion.Control>
                        <Accordion.Panel>{item.answer}</Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>}
        </div>
    },
    // {
    //     title: t('comments')
    // }
  ], [data, t])

  if (!data?.id) {
    return <LoadingOverlay visible={true} />
  }

  return (
    <Box w='100vw' bg='white' py='3rem' style={{overflow: 'hidden'}}>
        <SectionHeader title={t('cialk_products')} link='/products' />
        {t('description') && <Grid columns={12} mt={isMobile ? 0 : '3rem'} justify='space-between' maw={1300} px='md' mx='auto'>
            <Grid.Col xs={12} lg={4}>
                <Box p='xs'>
                    <img src={getImage(image)} style={{objectFit: 'cover', aspectRatio: 1, overflow: 'hidden', width: '100%'}} />
                </Box>
                <Grid columns={4} w='100%' m={0}>
                    {data.images?.map((e, idx) => (
                        <Grid.Col xs={1}>
                            <UnstyledButton display='flex' onClick={() => setImage(e)}>
                                <img
                                    src={getImage(e)}
                                    style={{
                                        borderColor: e === image ? colors.primary : colors.white,
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        objectFit: 'cover',
                                        overflow: 'hidden',
                                        width: '100%',
                                        aspectRatio: 1
                                    }}
                                />
                            </UnstyledButton>
                        </Grid.Col>
                    ))}
                </Grid>
            </Grid.Col>
            <Grid.Col xs={12} lg={7}  pb={isMobile ? '3rem' : 0}>
                <Title color='primary.9' size='h1' my='lg'>{data?.name[lang]}</Title>
                <Tabs key='1' w={'100%'} color='primary' styles={styles.tab} defaultValue={tab1[0].title}>
                    <Tabs.List key='1'>
                        {tab1.map(e => <Tabs.Tab value={e.title}>
                            {e.title}
                        </Tabs.Tab>)}
                    </Tabs.List>
                    {tab1.map(e => <Tabs.Panel pt='2.5rem' value={e.title} mih={300} p={isMobile ? 'lg':undefined}>
                        {e.content}
                    </Tabs.Panel>)}
                </Tabs>
                
                <Tabs key='2' w={'100%'} color='primary' styles={styles.tab} defaultValue={tab2[0].title}>
                    <Tabs.List key='2'>
                        {tab2.map(e => <Tabs.Tab value={e.title}>
                            {e.title}
                        </Tabs.Tab>)}
                    </Tabs.List>
                    {tab2.map(e => <Tabs.Panel pt='2.5rem' value={e.title} mih={300} p={isMobile ? 'lg':undefined}>
                        {e.content}
                    </Tabs.Panel>)}
                    
                </Tabs>
            </Grid.Col>
        </Grid>}
    </Box>
  )
}

export default ProductDetails