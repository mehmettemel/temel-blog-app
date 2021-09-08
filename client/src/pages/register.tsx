import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
  return (
    <div className='flex flex-wrap w-full py-6'>
      <div className='flex flex-col w-full md:w-1/2'>
        <div className='flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-6 md:px-24 lg:px-32'>
          <p className='text-3xl text-center'>Create Your Account</p>
          <RegisterForm />
          <div className='pt-2 pb-12 text-center'>
            <p>
              Do you have an account?{' '}
              <Link to='/login' className='link-secondary'>
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='w-1/2 shadow-2xl '>
        <img
          className='hidden object-cover w-full h-full md:block'
          src='https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        />
      </div>
    </div>
  )
}

export default Register
