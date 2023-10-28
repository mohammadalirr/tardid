import { Box, Grid, Tabs, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SectionHeader } from '~/components/Client/Home/SectionHeader'
import { ch } from '~/config/common'
import { Button, Square } from '~/core/components/Template'
import { getImage, slug } from '~/core/helpers/Formatter'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import { SubCompanyEntity } from '~/data/entities/SubCompany'
import useDataById from '~/data/query/Base/useDataById'
import useColor from '~/data/query/useColor'
import useStyles from '~/data/query/useStyles'
import useWindowSize from '~/data/query/useWindowSize'

function SubCompaniesPage() {
  const {t, lang, isRtl} = useTranslate()
  const {query} = useRouter()
  const {data, refetch} = useDataById('subCompany', 'list')
  const {isMobile} = useWindowSize();
  const styles = useStyles()
  const [initial, setInitial] = useState()
  const imgStyle = {
    width: 250,
    height: 250
  }

  useEffect(() => {
    if (!!data) {
      if (!!query.c){
        setInitial((data || []).filter((e: any) => Object.values(e.name).map((e: any) => slug(e)).includes(String(query.c)))[0]?.id)
      } else {
        setInitial((data || [])[0]?.id)
      }
    }
  }, [query, data, lang])

  return (
    <Box w='100vw' bg='white' pt={isMobile ? 100 : 200} style={{overflow: 'hidden'}}>
      <SectionHeader
        title={t('cialk_sub_companies')}
        leftComponent={<Square flipX />}
        description={t('about_us_desc')}
      />
      {initial && <Tabs maw={1300} mx='auto' color='primary' styles={styles.tab} defaultValue={initial}>
        <Tabs.List>

          {(data || []).map((e: SubCompanyEntity) => <Tabs.Tab value={e.id}>
            {e.name[lang]}
          </Tabs.Tab>)}
        </Tabs.List>


        {(data || []).map((el: SubCompanyEntity) => <Tabs.Panel value={el.id} p={isMobile ? 'lg':undefined}>
          <Grid justify='space-between' columns={24} mt={isMobile ? 'lg' : '3rem'}>
            <Grid.Col xs={24} lg={7}>
              <img src={getImage(el.logo)} width={'100%'} />
            </Grid.Col>
            <Grid.Col xs={24} lg={16}>
              <Grid columns={24} justify='flex-end'>
                {el.images.slice(0,2).map((e: string, i: number) => !!e ? <Grid.Col style={{zIndex: el.images.slice(0,2).length-i}} xs={24} lg={8}>
                  <img src={getImage(e)} className='shadow-img' style={{...imgStyle, ...(isMobile ? {marginInline: 'auto'} : undefined)}}  />
                </Grid.Col> : null)}
              </Grid>
            </Grid.Col>
          </Grid>

          <Title size='h3' mt='3rem' mb='xl' color='primary'>{el.activityTitle[lang]}</Title>
          <Text size='md' mb='3rem' color='primary'>{el.description[lang]}</Text>
          {el.website && <Button
            iconStyle={{transform: isRtl ? 'rotate(45deg)' : 'rotate(-45deg)'}}
            mt='1rem'
            mb='3rem'
            onClick={() => window.open(el.website)}
          >
            {t('view_website')}
          </Button>}
        </Tabs.Panel>)}
      </Tabs>}
    </Box>
  )
}

export default SubCompaniesPage
