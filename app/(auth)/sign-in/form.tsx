'use client'

import { useAuth } from '@components/auth-provider'
import OAuth from '@components/oauth'
import { Button } from '@components/ui/button'
import { CardDescription } from '@components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from '../actions'

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(8).max(50),
})

const CustomForm = () => {
  const { update } = useAuth()

  // Default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    const res = await signIn(formData) // Pass the formData to the server action
    if (res) {
      console.log(res) // log any server response
      return // exit early
    }
    localStorage.setItem('auth-session', JSON.stringify(true))
    update() // update auth context
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Sign in
        </Button>
      </form>

      <div className='flex items-center py-4 text-xs uppercase text-gray-400 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600'>
        Or
      </div>

      <div>
        <CardDescription>Sign in with an OAuth provider</CardDescription>
        <OAuth />
      </div>
    </Form>
  )
}

export { CustomForm }
