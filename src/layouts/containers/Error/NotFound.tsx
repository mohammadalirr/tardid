import {
  createStyles,
  Title,
  Text,
  Button,
  Group,
  Box,
} from '@mantine/core'
import Link from 'next/link'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 250,
    height: '100vh',
    paddingBottom: 120,
    background: 'white'
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

function NotFound() {
  const { classes } = useStyles()
  const { t } = useTranslate()

  return (
    <Box className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t('not_found_page')}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {t('not_found_page_desc')}
      </Text>
      <Group position="center">
        <Link key={'refresh'} href="/" passHref>
          <Button variant='outline' size="md">
            {t('come_back_to_home')}
          </Button>
        </Link>
      </Group>
    </Box>
  )
}

export default NotFound
