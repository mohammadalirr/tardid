

import { Box } from '@mantine/core'
import { DotsProps } from '../type'

export function Dots({size, color, ...p}: DotsProps) {
  const scale = 176/163
  const p_ = {
    width:  scale*(size || 163),
    height:  size || 163,
  }

  return (<Box {...p}>
        <svg {...p_} viewBox="0 0 176 163" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="173.25" cy="2.25" r="2.25" transform="rotate(90 173.25 2.25)" fill={color}/>
            <circle cx="173.25" cy="41.75" r="2.25" transform="rotate(90 173.25 41.75)" fill={color}/>
            <circle cx="173.25" cy="81.25" r="2.25" transform="rotate(90 173.25 81.25)" fill={color}/>
            <circle cx="173.25" cy="120.75" r="2.25" transform="rotate(90 173.25 120.75)" fill={color}/>
            <circle cx="173.25" cy="160.25" r="2.25" transform="rotate(90 173.25 160.25)" fill={color}/>
            <circle cx="144.75" cy="2.25" r="2.25" transform="rotate(90 144.75 2.25)" fill={color}/>
            <circle cx="144.75" cy="41.75" r="2.25" transform="rotate(90 144.75 41.75)" fill={color}/>
            <circle cx="144.75" cy="81.25" r="2.25" transform="rotate(90 144.75 81.25)" fill={color}/>
            <circle cx="144.75" cy="120.75" r="2.25" transform="rotate(90 144.75 120.75)" fill={color}/>
            <circle cx="144.75" cy="160.25" r="2.25" transform="rotate(90 144.75 160.25)" fill={color}/>
            <circle cx="116.25" cy="2.25" r="2.25" transform="rotate(90 116.25 2.25)" fill={color}/>
            <circle cx="116.25" cy="41.75" r="2.25" transform="rotate(90 116.25 41.75)" fill={color}/>
            <circle cx="116.25" cy="81.25" r="2.25" transform="rotate(90 116.25 81.25)" fill={color}/>
            <circle cx="116.25" cy="120.75" r="2.25" transform="rotate(90 116.25 120.75)" fill={color}/>
            <circle cx="116.25" cy="160.25" r="2.25" transform="rotate(90 116.25 160.25)" fill={color}/>
            <circle cx="87.75" cy="2.25" r="2.25" transform="rotate(90 87.75 2.25)" fill={color}/>
            <circle cx="87.75" cy="41.75" r="2.25" transform="rotate(90 87.75 41.75)" fill={color}/>
            <circle cx="87.75" cy="81.25" r="2.25" transform="rotate(90 87.75 81.25)" fill={color}/>
            <circle cx="87.75" cy="120.75" r="2.25" transform="rotate(90 87.75 120.75)" fill={color}/>
            <circle cx="87.75" cy="160.25" r="2.25" transform="rotate(90 87.75 160.25)" fill={color}/>
            <circle cx="59.25" cy="2.25" r="2.25" transform="rotate(90 59.25 2.25)" fill={color}/>
            <circle cx="59.25" cy="41.75" r="2.25" transform="rotate(90 59.25 41.75)" fill={color}/>
            <circle cx="59.25" cy="81.25" r="2.25" transform="rotate(90 59.25 81.25)" fill={color}/>
            <circle cx="59.25" cy="120.75" r="2.25" transform="rotate(90 59.25 120.75)" fill={color}/>
            <circle cx="59.25" cy="160.25" r="2.25" transform="rotate(90 59.25 160.25)" fill={color}/>
            <circle cx="30.75" cy="2.25" r="2.25" transform="rotate(90 30.75 2.25)" fill={color}/>
            <circle cx="30.75" cy="41.75" r="2.25" transform="rotate(90 30.75 41.75)" fill={color}/>
            <circle cx="30.75" cy="81.25" r="2.25" transform="rotate(90 30.75 81.25)" fill={color}/>
            <circle cx="30.75" cy="120.75" r="2.25" transform="rotate(90 30.75 120.75)" fill={color}/>
            <circle cx="30.75" cy="160.25" r="2.25" transform="rotate(90 30.75 160.25)" fill={color}/>
            <circle cx="2.25" cy="2.25" r="2.25" transform="rotate(90 2.25 2.25)" fill={color}/>
            <circle cx="2.25" cy="41.75" r="2.25" transform="rotate(90 2.25 41.75)" fill={color}/>
            <circle cx="2.25" cy="81.25" r="2.25" transform="rotate(90 2.25 81.25)" fill={color}/>
            <circle cx="2.25" cy="120.75" r="2.25" transform="rotate(90 2.25 120.75)" fill={color}/>
            <circle cx="2.25" cy="160.25" r="2.25" transform="rotate(90 2.25 160.25)" fill={color}/>
        </svg>
    </Box>)
}