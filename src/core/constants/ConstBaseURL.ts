const env = process.env.URL_ENV ?? 'development'

const mapApiUrl = {
  development: 'http://127.0.0.1:4000/api',
  staging: 'http://5.34.202.162:4000/api',
  production: 'http://5.34.202.162:4000/api',
}

// @ts-expect-error
const BASE_API_URL = mapApiUrl[env]

// @ts-expect-error
const BASE_API_FILE = mapApiUrl[env].replace('/api', '')

export { BASE_API_URL, BASE_API_FILE }
