import dynamic from 'next/dynamic'

export default dynamic(
    () => import('~/views/Home'),
    { ssr: false }
)

