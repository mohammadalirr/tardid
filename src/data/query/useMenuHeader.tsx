import { useMemo } from 'react';
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'

interface HeaderMenuProps {
  link: string;
  label: string;
}

function useMenuHeader() {
  const {t} = useTranslate()
 
  const items = [
    {
      link: '/',
      label: t('home')
    }, {
      link: '/products',
      label: t('products')
    }, {
      link: '/subCompanies',
      label: t('sub_companies')
    }, {
      link: '/',
      label: t('news_and_blogs')
    }, {
      link: '/',
      label: t('projects')
    }, {
      link: '/',
      label: t('contact_us')
    }, {
      link: '/aboutUs',
      label: t('about_cialk')
    }
  ]
  
  return { items }
}

export default useMenuHeader
