import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSMS } from '../../redux/actions/authActions'
import { FormSubmit } from '../../utils/Typescript'

const LoginSMS = () => {
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(loginSMS(phone))
  }
  return (
    <form className='flex flex-col pt-3 md:pt-8' onSubmit={handleSubmit}>
      <div className='flex flex-col pt-4'>
        <div className='flex relative '>
          <div className='form-control w-full'>
            <label htmlFor='phone'></label>
            <div className='relative'>
              <input
                name='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type='text'
                placeholder='Your phone number'
                className='w-full pr-16 input input-primary input-bordered'
              />
              <div className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button disabled={phone ? false : true} type='submit' className='w-full btn-primary btn mt-5'>
        <span className='w-full'>Sign In</span>
      </button>
    </form>
  )
}

export default LoginSMS
