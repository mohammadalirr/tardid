const env = process.env.URL_ENV ?? 'development'

const mapApiUrl = {
  development: 'http://localhost:4000/api',
  staging: 'https://core.cialk-grp.com/api',
  production: 'https://api.example.com/v1',
}

// @ts-expect-error
const BASE_API_URL = mapApiUrl[env]

// @ts-expect-error
const BASE_API_FILE = mapApiUrl[env].replace('/api', '')

export { BASE_API_URL, BASE_API_FILE }
