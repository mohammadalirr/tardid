import { Box, Flex, Text, Title, UnstyledButton } from '@mantine/core'
import Router from 'next/router';
import React from 'react';
import Icon from '~/core/components/Icon/Icon';
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate';
import useColor from '~/data/query/useColor';

interface Props {
    title: string
    description?: string
    link?: string
    hideShowMore?: boolean
    leftComponent?: React.ReactNode
}

export function SectionHeader({title, description, link, hideShowMore, leftComponent}: Props) {
    const {t, isRtl} = useTranslate()
    const colors = useColor()

    return (
        <Flex mx='auto' px='md' py='xl' justify='space-between' align='center' style={{maxWidth: '1300px'}}>
            <Box>
                <Title color='primary' size='h2'>{title}</Title>
                {description && <Text size='sm' opacity={0.7} color='primary'>{description}</Text>}
            </Box>
            {leftComponent || (!hideShowMore && <UnstyledButton align='center' onClick={!!link ? () => Router.push(link) : undefined} gap='lg' component={Flex}>
                <Text color='primary'>{t('show_more')}</Text>
                <Icon name={isRtl ? 'ArrowLeft' : 'ArrowRight'} stroke={colors.primary} />
            </UnstyledButton>)}
        </Flex>
    )
}