'use client'
import { useAuth } from '@components/auth-provider'
import { Button } from '@components/ui/button'
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
import { signUp } from '../actions'

const formSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().min(2).max(50).email(),
  password: z.string().min(8).max(50),
})

const CustomForm = () => {
  const { update } = useAuth()

  // Default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('email', values.email)
    formData.append('password', values.password)

    const res = await signUp(formData)
    if (res) {
      console.log(res) // log any server response
      return
    }
    localStorage.setItem('auth-session', JSON.stringify(true)) //set localStorage session
    update() // update auth value in context
  }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder='John' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>last name</FormLabel>
                <FormControl>
                  <Input placeholder='Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          Sign up
        </Button>
        <Button variant='outline' className='w-full'>
          Sign up with GitHub
        </Button>
        <Button variant='outline' className='w-full'>
          Sign up with Google
        </Button>
      </form>
    </Form>
  )
}

export { CustomForm }
