import dynamic from 'next/dynamic'

export default dynamic(
    () => import('~/views/AboutUs'),
    { ssr: false }
)
