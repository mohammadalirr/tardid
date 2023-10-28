import { Box, useMantineTheme } from '@mantine/core'
import { SquareProps } from '../type'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'

export function Square({size, border, dir, color, flipX, children, ...p}: SquareProps) {
  const b = border || 3
  const t = dir !== 'bottom'
  const c = (color || 'primary.9')
  const {isRtl} = useTranslate()
  const flipX_ = isRtl ? flipX : !flipX

  return (
    <Box h={size || '80px'} w={size || '80px'} style={{
        borderColor: c,
        borderTopWidth: t ? b : 0,
        borderRightWidth: t ? b : 0,
        borderBottomWidth: !t ? b : 0,
        borderLeftWidth: !t ? b : 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }} {...p} className={[(flipX_ ? 'flip-h' : ''), p.className].join(' ')}>
      <div className={(flipX_ ? 'flip-h' : '')}>
        {children}
      </div>
    </Box>
  )
}