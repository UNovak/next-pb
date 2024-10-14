'use client'

import { signOut } from '@app/(auth)/actions'
import { useAuth } from '@components/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button, buttonVariants } from '@ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu'
import { ModeToggle } from '@ui/mode-toggle'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')
  const { authenticated, update } = useAuth()

  const handleSignOut = async () => {
    const res = await signOut()
    localStorage.removeItem('auth-session')
    localStorage.removeItem('pocketbase_auth')
    update()
  }

  const navLinks = [
    { ref: '/about', label: 'About' },
    { ref: '/feed', label: 'Feed' },
    { ref: '/help', label: 'Help' },
    {
      ref: 'https://github.com/UNovak/next-pb',
      target: '_blank',
      label: 'Code',
    },
  ]

  const dashLinks = [
    { ref: '/dashboard/user-id', label: 'Dashboard' },
    { ref: '/dashboard/user-id/settings', label: 'Settings' },
    { ref: '/dashboard/user-id/account', label: 'Account' },
  ]

  const authLinks = [
    { ref: '/sign-in', label: 'Sign In' },
    { ref: '/sign-up', label: 'Sign Up' },
  ]

  return (
    <nav className='fixed flex h-20 w-full items-center justify-between border-b px-10 shadow-md'>
      {/* left */}
      <div className='text-xl font-bold'>
        <Link href='/'>next-pb</Link>
      </div>

      {/* middle, lg screen and above */}
      <div className='hidden space-x-6 lg:flex'>
        {navLinks.map((link) => {
          const isActive = pathname === link.ref

          return (
            <Link
              target={link?.target || '_self'}
              key={link.label}
              href={link.ref}
              className={`${buttonVariants({ variant: 'link' })} ${isActive ? 'underline' : ''}`}>
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* right */}
      <div className='flex space-x-4'>
        <ModeToggle />
        <div
          className={`space-x-4 ${authenticated ? 'hidden' : 'hidden lg:flex'}`}>
          <Button asChild variant='default'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
          <Button asChild variant='secondary'>
            <Link href='/sign-up'>Sign Up</Link>
          </Button>
        </div>
        {!isDashboard && (
          <DropdownMenu>
            {/* not available on /dashboard routes */}
            {/* not available to !authenticated on lg screens and above */}
            <DropdownMenuTrigger
              asChild
              className={`${!authenticated ? 'lg:hidden' : 'flex'}`}>
              <Button
                variant='outline'
                size={`${authenticated ? 'icon' : 'default'}`}
                className={`${authenticated ? 'overflow-hidden rounded-full' : ''}`}>
                {authenticated ? (
                  // avatar icon if authenticated
                  <Avatar>
                    <AvatarImage src='users-avatar-image' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  // menu icon if !authenticated
                  <Menu />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuGroup className='lg:hidden'>
                {navLinks.map((link) => (
                  // navigation links only up to large screen
                  <DropdownMenuItem asChild key={link.label}>
                    <Link
                      className='w-full'
                      target={link?.target || '_self'}
                      href={link.ref}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {authenticated && <DropdownMenuSeparator />}
              </DropdownMenuGroup>
              {authenticated &&
                // links for authenticated user to parts of dashboard
                dashLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.label}>
                    <Link href={link.ref} className='w-full'>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

              <DropdownMenuSeparator />
              {!authenticated ? (
                // sign in/up links
                authLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.label}>
                    <Link href={link.ref} className='w-full'>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem
                  onClick={() => handleSignOut()}
                  className='w-full focus:bg-destructive/90'>
                  Sign Out
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  )
}

export { Navbar }
