import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import axios, { AxiosError, AxiosInstance } from 'axios'
import _ from 'lodash'
import Router from 'next/router'
import { ms } from '~/core/helpers/Formatter'
import { AXIOS_TIMEOUT, LOCAL_STORAGE_ACCESS, LOCAL_STORAGE_REFRESH } from './env'

const timeout = ms(AXIOS_TIMEOUT)

function createAxios(baseURL: string, accessLocalStorage?: string, refreshLocalStorage?: string) {
  const instanceAxios = axios.create({ baseURL, timeout, headers: {
    'Access-Control-Allow-Origin': '*',
  }})

  // interceptor request
  if (!_.isEmpty(accessLocalStorage)) {
    instanceAxios.interceptors.request.use((config) => {
      const curConfig = { ...config }

      const ACCESS_TOKEN = localStorage.getItem(String(accessLocalStorage))
      const REFRESH_TOKEN = localStorage.getItem(String(refreshLocalStorage))
      const LANG = localStorage.getItem('lang')

      // ALWAYS READ UPDATED TOKEN
      try {
        curConfig.headers.accessToken = ACCESS_TOKEN
        curConfig.headers.refreshToken = REFRESH_TOKEN
        curConfig.headers.lang = LANG
      } catch (e) {
        console.log(e)
      }

      return curConfig
    })
  }

  // interceptor response
  instanceAxios.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      console.log({error})
      const statusCode = _.get(error, 'response.status', null)
      const message = _.get(error, 'response.data.message', null)

      const errorClientCode = [
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
        414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431,
        451,
      ]

      const errorServerCode = [
        500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
      ]

      if (errorClientCode.includes(Number(statusCode)) && location.pathname !== '/register') {
        if (typeof window !== 'undefined' && location.pathname !== '/admin/login') {
          notifications.show({
            // title: `Client Error : ${statusCode}`,
            message,
            color: 'red',
            withCloseButton: false,
            icon: <IconX size={16} />,
          })
  
          if ((statusCode === 401 || statusCode === 403)) {

            localStorage.removeItem(LOCAL_STORAGE_ACCESS)
            localStorage.removeItem(LOCAL_STORAGE_REFRESH)
            Router.back()
          }
        }
      }

      if (errorServerCode.includes(Number(statusCode))) {
        const data_ = error.response?.data as any
        const errMessage: any = data_?.message ?? error.message

        notifications.show({
          title: `Server Error : ${statusCode}`,
          message: errMessage,
          color: 'red',
          withCloseButton: false,
          icon: <IconX size={16} />,
        })
      }

      return Promise.reject(error)
    }
  )

  return instanceAxios
}

class FetchApi {
  private axiosInstance: AxiosInstance | null

  private readonly baseURL: string

  private readonly accessLocalStorage?: string
  private readonly refreshLocalStorage?: string

  constructor(baseURL: string, accessLocalStorage?: string, refreshLocalStorage?: string) {
    this.axiosInstance = null
    this.baseURL = baseURL
    this.accessLocalStorage = accessLocalStorage
    this.refreshLocalStorage = refreshLocalStorage
  }

  public get default(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = createAxios(this.baseURL, this.accessLocalStorage, this.refreshLocalStorage)

      return this.axiosInstance
    }

    return this.axiosInstance
  }
}

export default FetchApi
