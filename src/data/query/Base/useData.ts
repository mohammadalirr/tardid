import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BASE_API_URL } from '~/core/constants/ConstBaseURL'
import { getTypeOfField } from '~/core/helpers/Formatter'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '~/core/hooks/useUrlQuery/useUrlQuery'
import { EKeys } from '~/data/entities'
import BaseRepository from '~/data/repository/BaseRepository'

type TError = AxiosError

function useData(
  keyName: EKeys,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<any, TError>
) {
  type Entity = typeof getTypeOfField;(keyName)
  type TQueryFnData = {
    data: Entity[]
    total: number
  }
  const endpoint = `/${keyName}`
  const endpointURL = `${BASE_API_URL}/${keyName}?`
  const repo = new BaseRepository({ endpoint })
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(endpoint),
    () =>
      repo.api
        .get(urlQuery.transformUrl(endpointURL))
        .then((res) => res.data),
    { ...options }
  )
  return {
    ...query,
    data: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    helpers: urlQuery,
  }
}

export default useData
