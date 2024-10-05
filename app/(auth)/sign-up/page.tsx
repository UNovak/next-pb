import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@components/ui/card'
import Link from 'next/link'
import { CustomForm } from './form'

const SignUp = () => {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CustomForm />
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/sign-in' className='underline'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignUp
