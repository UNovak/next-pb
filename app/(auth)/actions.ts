'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'

const pb = new PocketBase(process.env.POCKETBASE_URL)

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    // authenticate using email and password
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password)

    // create cookie with esential data only
    const cookie = JSON.stringify({
      token: token,
      authenticated: true,
      verified: model.verified,
      id: model.id,
      avatar: model.avatar,
    })

    // set cookie
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

export async function signUp(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    // try creating a new record in users collection
    const res = await pb.collection('users').create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirm: password,
    })

    // authenticate the created user
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password)

    // create cookie with esential data only
    const cookie = JSON.stringify({
      token: token,
      authenticated: true,
      verified: model.verified,
      id: model.id,
      avatar: model.avatar,
    })

    // set cookie
    cookies().set('pb_auth', cookie, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    })

    // catch errors
  } catch (err) {
    return { status: 400, message: 'something went wrong' }
  }

  if (pb?.authStore?.isValid) redirect('/')
}

export async function signOut() {
  console.log('signing out')
  cookies().delete('pb_auth')
  redirect('/')
}
