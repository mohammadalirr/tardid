import dynamic from 'next/dynamic'

export default dynamic(
    () => import('~/views/Products/ProductDetails'),
    { ssr: false }
)

