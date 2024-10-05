import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import Link from 'next/link'
import { CustomForm } from './form'

const SignIn = () => {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign In</CardTitle>
        <CardDescription>
          Enter your details below to sign-in to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CustomForm />
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignIn
