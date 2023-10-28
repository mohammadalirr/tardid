import { Box, Flex, Image, Text, Title, UnstyledButton, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { ch } from '~/config/common'
import Icon from '~/core/components/Icon/Icon'
import { Square, Button } from '~/core/components/Template'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import useColor from '~/data/query/useColor'

export function Hero() {
  const {t, isRtl} = useTranslate()
  const c = useColor()
  const {colors} = useMantineTheme()
  const [muted, setMuted] = useState(true)
  return (
    <Box h='100vh' w='100vw' bg='primary.9'>
      <Flex justify='center' bg='rgba(19, 27, 40, 0.75)' pos='absolute' style={{zIndex: 1}} h='100vh' w='100vw'>
        <Box pos='relative' style={{zIndex: 1}} h='70vh' w={{base: '90vw', sm: '80vw'}} mt={{base: '15vh', sm: '25vh'}}>
          <Image src='static/images/dots.svg' style={{width: '17vh', height: '17vh', [isRtl ? 'left' : 'right']: 0}} pos='absolute' />
          <Square right={0} color={ch('#fff', 30)} />
          <Title color={c.white} mt='3rem'>{t('cialk')}</Title>
          <Text size='sm' color={c.white} mb='2rem'>{t('brand_desc')}</Text>

          <Text color={c.white} w={{base: '90vw', sm: '40vw'}}>{t('hero_desc')}</Text>
          <Flex wrap='wrap' gap='xl' mt='xl'>
            {['hero_item_1', 'hero_item_2'].map(e => <Flex gap='sm'>
              <Icon name='CheckCircleBroken' stroke={c.white} />
              <Text color={c.white}>{t(e)}</Text>
            </Flex>)}
          </Flex>
          <Button mt='2.5rem'>
            {t('hero_button')}
          </Button>
          <Flex gap='xl' mt='xl' justify='space-between'>
            <Button
              hideArrow
              leftIcon={<Icon name='PlayCircle' stroke={c.white} />}
              bg={colors.primary[6]}
              iconBg={colors.primary[5]}
              color={c.white}
              mt='2.5rem'>
              {t('view_video')}
            </Button>
            <Square dir='bottom' left={0} color={ch('#fff', 30)}>
              <UnstyledButton onClick={() => setMuted(!muted)}>
                {muted ? <Icon name='VolumeX' stroke={c.white} /> : <Icon name='VolumeMax' stroke={c.white} />}
              </UnstyledButton>
            </Square>
          </Flex>
        </Box>
      </Flex>
      {/* <video
        autoPlay
        muted={muted}
        loop
        style={{ height: "100%", width: "100%", objectFit: "cover" }} //object-fit:cover
      >
        <source src='static/videos/hero.mp4' type="video/mp4" />
      </video> */}
    </Box>
  )
}