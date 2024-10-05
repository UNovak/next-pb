'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const pb = new PocketBase(process.env.POCKETBASE_URL)

  try {
    // Authenticate using email and password
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password)

    const cookie = JSON.stringify({ token, model })

    cookies().set('pb_auth', cookie, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    })

    // catch any errors
  } catch (err) {
    return { status: 400, message: 'something went wrong' }
  }

  // if no errors redirect to '/'
  if (pb?.authStore?.isValid) redirect('/')
}
