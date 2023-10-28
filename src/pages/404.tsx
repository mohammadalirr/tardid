import dynamic from 'next/dynamic';

export default dynamic(
    () => import('~/layouts/containers/Error/NotFound'),
    { ssr: false }
)