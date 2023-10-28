import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BASE_API_URL } from '~/core/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '~/core/hooks/useUrlQuery/useUrlQuery'
import { UserEntity } from '../entities/User'
import AuthRepository from '../repository/AuthRepository'

type UseUserResult = {
  data: UserEntity
  total: number
}

type TQueryFnData = UseUserResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/user`

function useVerifySession(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/user'),
    () =>
      AuthRepository.api
        .get(urlQuery.transformUrl(endpointURL))
        .then((res) => res.data).catch(e => {}),

    {
      retry: (failureCount, error: AxiosError) => {
        if (error?.response?.status === 401) {
          return false
        }
        return failureCount <= 3
      },
      ...options,
    }
  )
  console.log({query})

  return {
    ...query,

    data: query.data?.data,
    total: query.data?.total,
    helpers: urlQuery,
  }
}

export default useVerifySession
