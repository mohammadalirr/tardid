import {
  IconActivity,
  IconBox,
  IconBuilding,
  IconHome,
  IconLanguage,
  IconMessage,
  IconUsers,
} from '@tabler/icons-react'
import React from 'react'
import { useAuthSession } from '~/core/hooks/useAuthSession/useAuthSession'

interface LinkProps {
  icon: React.ReactNode
  color: string
  label: string
  link?: string
}

export interface MainLinkProps extends LinkProps {
  links?: LinkProps[]
}

function useMenuSidebar() {
  const userAuth = useAuthSession()
 
  const adminData = [
    {
      icon: <IconHome size={16} />,
      color: 'blue',
      label: 'داشبورد',
      link: '/admin/dashboard',
    },
    {
      icon: <IconMessage size={16} />,
      color: 'blue',
      label: 'تیکت ها',
      link: '/admin/ticket',
    },
    {
      icon: <IconUsers size={16} />,
      color: 'blue',
      label: 'کاربران',
      link: '/admin/user',
    },
    {
      icon: <IconBuilding size={16} />,
      color: 'blue',
      label: 'شرکت های زیر مجموعه',
      link: '/admin/subCompany',
    },
    {
      icon: <IconActivity size={16} />,
      color: 'blue',
      label: 'حوزه های فعالیت',
      link: '/admin/activityArea',
    },
    {
      icon: <IconBox size={16} />,
      color: 'blue',
      label: 'محصولات',
      link: '/admin/product',
    },
    {
      icon: <IconLanguage size={16} />,
      color: 'blue',
      label: 'زبان ها',
      link: '/admin/language',
    },
  ]
  
  const data = adminData

  return { data, total: data.length }
}

export default useMenuSidebar
