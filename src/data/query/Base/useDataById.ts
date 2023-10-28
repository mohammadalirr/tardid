// @ts-nocheck
// @ts-ignore

import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getTypeOfField } from "~/core/helpers/Formatter"
import useUrlQuery, { UseUrlQueryOptions } from "~/core/hooks/useUrlQuery/useUrlQuery"
import BaseRepository from "~/data/repository/BaseRepository"

type TError = AxiosError

function useDataById(
  keyName: string,
  id?: string,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<any, TError>
) {
  if (id !== undefined && id !== 'undefined') {
    type Entity = ReturnType<typeof getTypeOfField>
    const endpoint = `/${keyName}`

    const urlQuery = useUrlQuery(urlOptions ?? {})
    const repo = new BaseRepository({ endpoint })
    const query = useQuery<Entity, TError>(
      urlQuery.transformKey([`${endpoint}-by-id`, id]),
      () =>
        repo.api
          .get(urlQuery.transformUrl(`${endpoint}/${id}`))
          .then((res) => res.data),
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        select: (res: any) => res?.data,
        enabled: Boolean(id),
        ...options,
      }
    ) as any

    return {
      ...query,
      helper: urlQuery,
    }
  } else {
    return {
      isLoading: false,
      remove: () => {},
      data: {},
      helper: {},
    }
  }
  
}

export default useDataById
