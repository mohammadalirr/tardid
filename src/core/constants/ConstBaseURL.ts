const env = process.env.URL_ENV ?? 'development'

const mapApiUrl = {
  development: 'http://127.0.0.1:4000/api',
  staging: 'https://core.meshkatapp.ir/api',
  production: 'https://core.meshkatapp.ir/api',
}

// @ts-expect-error
const BASE_API_URL = mapApiUrl[env]

// @ts-expect-error
const BASE_API_FILE = mapApiUrl[env].replace('/api', '')

export { BASE_API_URL, BASE_API_FILE }
