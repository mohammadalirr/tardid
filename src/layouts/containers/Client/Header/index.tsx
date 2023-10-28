import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, rem, Image, Drawer, ScrollArea, Divider, Flex, Menu, UnstyledButton, Text, Box, useMantineTheme, TextProps } from '@mantine/core';
import { useDisclosure, useLocalStorage, useMediaQuery, useViewportSize, useWindowEvent } from '@mantine/hooks';
import Router, { useRouter } from 'next/router';

import {
  useScroll,
  useTransform,
  motion,
  useAnimation
} from "framer-motion";
import useColor from '~/data/query/useColor';
import useMenuHeader from '~/data/query/useMenuHeader';
import useDataById from '~/data/query/Base/useDataById';
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate';
import Icon from '~/core/components/Icon/Icon';
import Link from 'next/link';
import useWindowSize from '~/data/query/useWindowSize';
// import languages, { getFlag } from "language-flag-colors";

const getFlag = (e: string) => `https://www.countryflagicons.com/FLAT/64/${e.toUpperCase()}.png`

const MotionHeader = motion(Header);
const MotionImage = motion(Image);
// @ts-ignore
const MotionText = motion(Text) as any;


const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '1rem',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      color: theme.colors.secondary[3],
    },
  },

  linkActive: {
    '&, &:hover': {
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  hiddenDesktop: {
    background: theme.colors.primary[9],
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },


}));

function ClientHeaderLayout() {
  const router = useRouter()
  const queryMenuHeader = useMenuHeader()
  const [opened, { toggle }] = useDisclosure(false);
  const [langOpened, setLangOpened] = useDisclosure(false);
  const [sticky, setSticky] = useDisclosure(false);
  const [active, setActive] = useState(queryMenuHeader.items[0].link);
  const { classes, cx } = useStyles();
  const theme = useMantineTheme()
  const {t, isRtl} = useTranslate()
  const colors = useColor()
  const { height } = useViewportSize();
  const {isMobile} = useWindowSize();
  const langs = useDataById('language', 'list')
  const [lang, setLang] = useLocalStorage({key: 'lang'})


  useEffect(() => {
    console.log(langs.data)
  }, [langs]) 

  const isTransparent = () => {
    switch (router.pathname) {
      case '/':
        return true
      case '/en':
        return true
      default:
        return false
    }
  }

  const color = isTransparent() ? '#fff' : colors.primary
  const bg = isTransparent() ? '#fffff00' : colors.white
  const border = isTransparent() ? theme.colors.primary[7] : theme.colors.primary[3]

  const { scrollY } = useScroll();
  const scrollYRange = [0, 100];

  const motionValueScrollYFactory = (values: any[]) => {
    return useTransform(scrollY, scrollYRange, values);
  };

  const imageHeightSize: any = motionValueScrollYFactory(isMobile ? ["55px", "32px"] : ["64px", "0px"]);
  const imageWidthSize: any = motionValueScrollYFactory(isMobile ? ["200px", "110.5px"] : ["221px", "0px"]);
  const imageY: any = motionValueScrollYFactory(isMobile ? ["0px", "0px"] : ["20px", "0px"]);
  const contentColor: any = motionValueScrollYFactory([color, colors.primary]);
  const contentBg: any = motionValueScrollYFactory([bg, colors.white]);
  const contentBorder: any = motionValueScrollYFactory([border, theme.colors.primary[3]]);

  const controls = useAnimation();

  scrollY.onChange((val) => {
    if (val < (height/12)) {
      controls.start("visible");
      setSticky.close()
    }
    if (val > (height/12)) {
      setSticky.open()
    }
  });

  const items = queryMenuHeader.items.map((link) => (
    <Link key={link.label} href={link.link}>
      <motion.div
        className={cx(classes.link, { [classes.linkActive]: active === link.link })}
        style={{color: contentColor}}
      >
        {link.label}
      </motion.div>
    </Link>
  ));

  const iconColor = useMemo(() => sticky ? colors.primary : color ,[sticky])

  return (
    <MotionHeader height='auto' animate={controls} style={{background:contentBg, borderBottomColor: contentBorder}}>
      <Container size='xl' className={classes.inner}>
        <Flex justify='space-between' align={isMobile ? 'center' : 'flex-start'} w='100%'>
          <Group>
            <Burger key={'burger'} color={iconColor} opened={opened} onClick={toggle} size="sm" mx='0' className={classes.burger} />
            <Menu
              position="bottom-end"
              key={'menu'}
              styles={{dropdown: {zIndex: 10001, position: 'absolute'}}}
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={setLangOpened.toggle}
              onOpen={setLangOpened.toggle}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton className={classes.links} style={{marginTop: '5px'}}>
                  <Group style={{gap: 7}}>
                    <MotionText key={'text'} weight={500} size="sm" mr={3} style={{color: contentColor}}>
                      {(langs.data || []).filter((e: any) => e.keyName === lang)[0]?.nativeName}
                    </MotionText>
                    <Icon name='ChevronDown' key={'icon'} stroke={iconColor} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown bg={isTransparent() && !sticky ? 'primary.9' : 'white'} style={{borderColor: theme.colors.primary[7] }}>
                {(langs.data || []).map((e: any) => <Menu.Item onClick={() => setLang(e.keyName)} color={iconColor}
                  // icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
                >
                  <Flex onClick={async () => {
                    await setLang(e.keyName)
                  }} align='center' gap='sm'>
                    <img src={getFlag(e.flagKey)} style={{width: 20}} />
                    {e.nativeName}
                  </Flex>
                </Menu.Item>)}
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group>
            <Flex key={'flex'} direction='column' align='center'>
              <MotionImage
                src={sticky || !isTransparent()
                  ? '/static/images/logo-dark.svg'
                  : '/static/images/logo-light.svg'
                }
                style={{
                  height: imageHeightSize,
                  width: imageWidthSize,
                  marginBottom: imageY
                }}
              />
              <Group className={classes.links} style={{gap: 5}}>
                {items}
              </Group>
            </Flex>
          </Group>

          <Group noWrap>
            <ActionIcon key={'search'} variant='transparent' size="lg">
              <Icon name='SearchMd' stroke={iconColor} />
            </ActionIcon>
          </Group>
        </Flex>

        <Drawer
          opened={opened}
          onClose={toggle}
          
          size="100%"
          padding="md"
          styles={{
            content: {
              background: theme.colors.primary[9]
            },
            header: {
              background: theme.colors.primary[9]
            }
          }}
          title={t('cialk')}
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider my="sm" color={'dark.5'} />

            {queryMenuHeader.items.map((link) => <a key={link.link} href={link.link} className={classes.link}>
              {link.label}
            </a>)}

            <Divider my="sm" color={'dark.5'} />

          </ScrollArea>
        </Drawer>
        <Flex>
      </Flex>
      </Container>
      
    </MotionHeader>
  );
}

export default ClientHeaderLayout