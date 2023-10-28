import { useLocalStorage } from '@mantine/hooks'
import _ from 'lodash'
import Router from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import useData from '~/data/query/Base/useData'
import useDataById from '~/data/query/Base/useDataById'

export function useTranslate() {
  const [lang, setLang] = useLocalStorage({key: 'lang'})
  const isRtl = useMemo(() => ['fa'].includes(lang), [lang])
  const { data, isLoading, isFetching, error } = useDataById('language', `locale?lang=${lang}`)

  useEffect(() => console.log('data', data), [data])

  const t = useCallback((key: string) => {
    const d = data || {}
    return d[key]
  }, [data, isLoading, lang])

  return { t, lang, setLang, isRtl }
}
