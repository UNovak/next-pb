'use client'

import { Button, buttonVariants } from '@ui/button'
import { ModeToggle } from '@ui/mode-toggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const [auth, setAuth] = useState(true)

  const navLinks = [
    { ref: '/about', label: 'About' },
    { ref: '/gallery', label: 'Gallery' },
  ]

  const authLinks = [
    { ref: '/sign-in', label: 'Sign In' },
    { ref: '/sign-up', label: 'Sign Up' },
    { ref: '/sign-out', label: 'Sign Out' },
  ]

  return (
    <nav className='fixed flex h-20 w-full items-center justify-between px-10 shadow-md'>
      {/* left */}
      <div className='text-xl font-bold'>
        <Link href='/'>next-pb</Link>
      </div>

      {/* middle */}
      <div className='flex space-x-6'>
        {navLinks.map((link) => {
          const isActive = pathname === link.ref

          return (
            <Link
              key={link.label}
              href={link.ref}
              className={`${buttonVariants({ variant: 'link' })} ${isActive ? 'underline' : ''}`}>
              {link.label}
            </Link>
          )
        })}
        <Link
          target='_blank'
          href='https://github.com/UNovak/next-pb'
          className={`${buttonVariants({ variant: 'link' })}`}>
          Code
        </Link>
      </div>

      {/* right */}
      <div className='flex items-center space-x-4'>
        {auth ? (
          <Button variant='destructive' onClick={() => setAuth(false)}>
            Sign Out
          </Button>
        ) : (
          <div className='flex space-x-4'>
            <Button asChild variant='default'>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
            <Button asChild variant='secondary'>
              <Link href='/sign-up'>Sign Up</Link>
            </Button>
          </div>
        )}
        <ModeToggle />
      </div>
    </nav>
  )
}

export { Navbar }
