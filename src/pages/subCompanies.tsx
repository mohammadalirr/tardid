import dynamic from 'next/dynamic'

export default dynamic(
    () => import('~/views/SubCompanies'),
    { ssr: false }
)

