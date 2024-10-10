'use client'

import { useAuth } from '@components/auth-provider'
import { Button } from '@components/ui/button'
import pb from '@lib/pocketbase'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export type Provider = {
  name: string
  state: string
  codeVerifier: string
  codeChallenge: string
  codeChallengeMethod: string
  authUrl: string
}

const OAuth = () => {
  const router = useRouter()
  const [providers, setProviders] = useState<Provider[]>([])

  const { update } = useAuth()
  if (!update) {
    console.error('AuthProvider is not mounted correctly')
    return null // or return a fallback UI
  }

  // theme for icon colors
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || 'line'

  useEffect(() => {
    const fetchProviders = async (): Promise<void> => {
      try {
        const result = await pb.collection('users').listAuthMethods()
        setProviders(result?.authProviders)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProviders()
  }, [])

  const Authenticate = async (provider: string): Promise<void> => {
    try {
      const { token, record: model } = await pb
        .collection('users')
        .authWithOAuth2({ provider: provider })

      if (token && model) {
        console.log('session read: ', localStorage.getItem('auth-session'))
        if (!localStorage.getItem('auth-session')) {
          localStorage.setItem('auth-session', JSON.stringify(true))
          update()
        }
        router.push('/')
      }
    } catch (error) {
      console.error('OAuth Error: ', error)
    }
  }

  return (
    <div className='flex gap-2 py-2'>
      {providers.map((provider: Provider) => (
        <Button
          key={provider.name}
          variant='outline'
          className='w-full py-6'
          onClick={() => Authenticate(provider.name)}>
          <Image
            src={`/icons/${provider.name}-${theme}.svg`}
            width={32}
            height={32}
            alt={`${provider.name} icon`}
          />
        </Button>
      ))}
    </div>
  )
}

export default OAuth
