import React, { useEffect, useState } from 'react'
import LoginPass from '../components/auth/LoginPass'
import LoginSMS from '../components/auth/LoginSMS'
import SocialLogin from '../components/auth/SocialLogin'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/Typescript'
const Login = () => {
  const [sms, setSms] = useState(false)
  const history = useHistory()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (auth.access_token) history.push('/')
  }, [auth.access_token, history])
  return (
    <div className='flex flex-wrap w-full py-6'>
      <div className='flex flex-col w-full xl:w-1/2'>
        <div className='flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-6 md:px-24 lg:px-32'>
          <p className='text-3xl text-center'>Welcome.</p>
          {sms ? <LoginSMS /> : <LoginPass />}

          <button className='btn btn-secondary mx-auto mt-4' onClick={() => setSms(!sms)}>
            {sms ? 'Sign in with password' : 'Sign in with mobile'}
          </button>
          <SocialLogin />
          <div className='pt-12  pb-2 text-center'>
            <p>
              Forgot your password?{' '}
              <Link to='/forgot_password' className='link-secondary'>
                Click here.
              </Link>
            </p>
          </div>
          <div className='pt-2 pb-12 text-center'>
            <p>
              Don&#x27;t have an account?{' '}
              <Link to='/register' className='link-secondary'>
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='w-full xl:w-1/2 shadow-2xl '>
        <img
          className='hidden object-cover w-full h-full md:block'
          src='https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        />
      </div>
    </div>
  )
}

export default Login
