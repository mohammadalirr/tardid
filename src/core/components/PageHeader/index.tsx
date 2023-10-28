import {
  ActionIcon,
  createStyles,
  Grid,
  Group,
  Text,
  Title,
  TitleProps,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import _ from 'lodash'

interface PageHeaderProps {
  title: string
  titleProps?: TitleProps
  subTitle?: string | null
  onBack?: () => void
  children?: React.ReactNode
}

export const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 600,
    fontFamily: `${theme.fontFamily}`,
  },
}))

function PageHeader(props: PageHeaderProps) {
  const { title, subTitle, children, onBack, titleProps } = props
  const { classes } = useStyles()

  return (
    <Grid columns={24}>
      <Grid.Col xs={_.isEmpty(children) ? 24 : 12}>
        <Group spacing="sm" my="auto">
          {onBack && (
            <ActionIcon key={'back'} component="a" onClick={onBack}>
              <IconArrowLeft size={18} />
            </ActionIcon>
          )}

          <Title key={'title'} size="h3" className={classes.title} {...titleProps}>
            {title}
          </Title>

          {subTitle && <Text key={'subtitle'} weight={400}>{subTitle}</Text>}
        </Group>
      </Grid.Col>

      {children && (
        <Grid.Col xs={12} style={{ textAlign: 'right' }}>
          {children}
        </Grid.Col>
      )}
    </Grid>
  )
}

export default PageHeader
