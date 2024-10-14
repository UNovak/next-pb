'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { signOut } from '@app/(auth)/actions'
import { useAuth } from '@components/auth-provider'
import {
  ContactRound,
  Home,
  LogOut,
  Settings,
  UserCog,
  UserPen,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = ({
  params,
}: {
  params: {
    user_id: string
  }
}) => {
  const pathname = usePathname()
  const { update } = useAuth()
  const links = [
    {
      tooltip: 'Dashboard',
      href: `/dashboard/${params.user_id}`,
      icon: <Home className='size-5 xl:size-6' />,
    },
    {
      tooltip: 'Account Settings',
      href: `/dashboard/${params.user_id}/account`,
      icon: <UserCog className='size-5 xl:size-6' />,
    },

    {
      tooltip: 'Profile Settings',
      href: `/dashboard/${params.user_id}/profile`,
      icon: <UserPen className='size-5 xl:size-6' />,
    },
    {
      tooltip: 'Followers',
      href: `/dashboard/${params.user_id}/followers`,
      icon: <ContactRound className='size-5 xl:size-6' />,
    },
    {
      tooltip: 'Settings',
      href: `/dashboard/${params.user_id}/settings`,
      icon: <Settings className='size-5 xl:size-6' />,
    },
  ]

  const handleSignOut = async () => {
    await signOut()
    localStorage.removeItem('auth-session')
    localStorage.removeItem('pocketbase_auth')
    update()
  }

  return (
    <TooltipProvider>
      <aside className='fixed left-0 top-20 flex h-[calc(100vh-5rem)] w-20 flex-col items-center justify-between border-r bg-background py-4 xl:w-24'>
        <nav className='flex flex-col gap-4 px-2'>
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href)

            return (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground xl:size-12 ${isActive ? 'text-primary' : ''}`}>
                    {link.icon}
                    <span className='sr-only'>{link.tooltip}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>{link.tooltip}</TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        <Tooltip>
          <TooltipTrigger
            onClick={() => handleSignOut()}
            className='flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-destructive/90 xl:size-12'>
            <LogOut className='size-5 xl:size-6' />
            <span className='sr-only'>Sign Out</span>
          </TooltipTrigger>
          <TooltipContent
            className='bg-destructive/90 text-destructive-foreground'
            side='right'>
            Sign Out
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  )
}

export { Sidebar }
