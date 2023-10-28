import dynamic from 'next/dynamic'

const ClientContainer = dynamic(() => import('~/layouts/containers/Client'))

const routes = [
  {
    path: '/',
    layout: ClientContainer,
  },
]

const clientRoutes = routes

export default clientRoutes
