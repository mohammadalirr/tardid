import dynamic from 'next/dynamic'

export default dynamic(
    () => import('~/views/Products'),
    { ssr: false }
)

