import { Button as MButton } from '@mantine/core'
import { MyButtonProps } from '../type'
import useColor from '~/data/query/useColor'
import Icon from '../Icon/Icon'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'

export function Button({hideArrow, bg, iconBg, color, iconStyle, children, ...p}: MyButtonProps) {
    const colors = useColor()
    const {isRtl} = useTranslate()

    return (
        <MButton
            rightIcon={hideArrow ? undefined : <Icon name={isRtl ? 'ArrowLeft' : 'ArrowRight'} stroke={colors.white} style={iconStyle} />}
            styles={{
                root: {
                    borderRadius: 0,
                    background: bg || colors.secondary,
                    border: 0,
                    '&:hover': {
                        background: bg || colors.secondary
                    },
                    padding: 0,
                    height: '3rem'
                },
                inner: {
                    padding: 0,
                },
                label: {
                    paddingInline: '1.25rem',
                    color: color || colors.primary,
                    fontWeight: 500
                },
                rightIcon: {
                    background: iconBg || colors.darkSecondary,
                    height: '100%',
                    width: '3rem',
                    justifyContent: 'center',
                    margin: 0,
                },
                leftIcon: {
                    background: iconBg || colors.darkSecondary,
                    height: '100%',
                    width: '3rem',
                    justifyContent: 'center',
                    margin: 0,
                }
            }}
            {...p}
        >
            {children}
        </MButton>
    )
}