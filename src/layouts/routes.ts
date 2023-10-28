import clientRoutes from './routes/client'

// @ts-expect-error
const globalRoutes = [].concat(clientRoutes)

export default globalRoutes
