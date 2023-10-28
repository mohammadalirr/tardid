import _ from 'lodash'
import { BASE_API_FILE } from '../constants/ConstBaseURL'
import { EKeys, Entities } from '~/data/entities'

/**
 *
 * @param value
 * @returns
 */
export function isNumeric(value: any): boolean {
  return !_.isNaN(parseFloat(value)) && _.isFinite(value)
}

/**
 *
 * @param value
 * @returns
 */
export function validateNumber(value: any): number {
  if (isNumeric(Number(value))) {
    return Number(value)
  }

  return 0
}

export function ms(value: string): number {
  const type = value.replace(/[^a-zA-Z]/g, '') // 7d = d
  const newValue = value.replace(/[^0-9]/g, '') // 7d = 7

  let result = 0

  if (type === 's') {
    result = Number(newValue) * 1000
  }

  if (type === 'm') {
    result = Number(newValue) * 60 * 1000
  }

  if (type === 'h') {
    result = Number(newValue) * 60 * 60 * 1000
  }

  if (type === 'd') {
    result = Number(newValue) * 24 * 60 * 60 * 1000
  }

  return result
}

/**
 *
 * @param value
 * @returns
 */
export function formatPercent(value: string | number): string {
  const newValue = validateNumber(value)

  const percent = newValue * 100
  const result = `${percent} %`

  return result
}

/**
 *
 * @param value
 * @returns
 */
export function hideAccountNumber(value: string): string {
  const valueLength = value.length
  const hideLength = valueLength - 6

  const startValue = value.slice(0, hideLength) // '81234'
  const endValue = value.slice(hideLength + 5) // '890'

  const result = `${startValue}*****${endValue}` // '+6281234***890'

  return result
}

/**
 *
 * @param value
 * @returns
 */
export function imageSource(value?: string | null) {
  let imgSrc = '/static/images/no_image.jpg'

  if (value) {
    imgSrc = value
  }

  return imgSrc
}

/**
 *
 * @param value
 * @returns
 */
export function validateURL(value: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator

  return !!pattern.test(value)
}

/**
 * 
 * @param value 
 * @returns 
 */
export function getInitialName(value: string): string {
  if (!value) {
    return ''
  }
  const names = value.split(' ')

  const firstShortName = names[0].substring(0, 1).toUpperCase()
  const secondShortName = names[0].substring(1, 2).toUpperCase()

  let initials = `${firstShortName}`

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  } else if (names.length <= 1) {
    initials = `${firstShortName}${secondShortName}`
  }

  return initials
}


/**
 *
 * @param value
 * @returns
 */
export function getImage(value: string): string {
  if (value?.includes('/uploads')) {
    return BASE_API_FILE + value
  }

  return value
}

/**
 *
 * @param value
 * @returns
 */
export function slug(value: string): string {
  return value?.replace(/\s+/g, '_')
}


/**
 *
 * @param baseUrl
 * @returns 
 */
export function getTypeOfField(baseUrl: EKeys): Entities[EKeys] {
  const e = {} as Entities;
  return e[baseUrl];
}
