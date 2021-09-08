import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/authActions'
import { FormSubmit, InputChange } from '../../utils/Typescript'

const RegisterForm = () => {
  const initialState = { account: '', password: '', name: '', cf_password: '' }
  const dispatch = useDispatch()
  const [userRegister, setUserRegister] = useState(initialState)
  const { account, password, name, cf_password } = userRegister
  const [typePass, setTypePass] = useState(false)

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setUserRegister({ ...userRegister, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()

    dispatch(register(userRegister))
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col pt-3 md:pt-8'>
        <div className='flex flex-col pt-4'>
          <div className='flex relative '>
            <div className='form-control w-full'>
              <label htmlFor='name'></label>
              <div className='relative'>
                <input
                  name='name'
                  onChange={handleChangeInput}
                  value={name}
                  type='text'
                  placeholder='Your name'
                  className='w-full pr-16 input input-primary input-bordered'
                />
                <div className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col pt-4'>
          <div className='flex relative '>
            <div className='form-control w-full'>
              <label htmlFor='account'></label>
              <div className='relative'>
                <input
                  name='account'
                  onChange={handleChangeInput}
                  value={account}
                  type='text'
                  placeholder='Your email or phone number'
                  className='w-full pr-16 input input-primary input-bordered'
                />
                <div className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
                  <svg
                    width='15'
                    height='15'
                    fill='currentColor'
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z'></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col pt-4 '>
          <div className='flex relative '>
            <div className='form-control w-full'>
              <label htmlFor='password'></label>
              <div className='relative'>
                <input
                  name='password'
                  onChange={handleChangeInput}
                  value={password}
                  type={typePass ? 'text' : 'password'}
                  placeholder='Your password'
                  className='w-full pr-16 input input-primary input-bordered'
                />
                <div className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
                  <svg
                    width='15'
                    height='15'
                    fill='currentColor'
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z'></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col pt-4 mb-12'>
          <div className='flex relative '>
            <div className='form-control w-full'>
              <label htmlFor='password'></label>
              <div className='relative'>
                <input
                  name='cf_password'
                  onChange={handleChangeInput}
                  value={cf_password}
                  type={typePass ? 'text' : 'password'}
                  placeholder='Write your password again'
                  className='w-full pr-16 input input-primary input-bordered'
                />
                <div className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
                  <svg
                    width='15'
                    height='15'
                    fill='currentColor'
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z'></path>
                  </svg>
                </div>
              </div>

              <div className='flex justify-between mt-4'>
                <div className='form-control w-20' onClick={() => setTypePass(!typePass)}>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>Show</span>
                    <input
                      type='checkbox'
                      checked={typePass ? true : false}
                      className='checkbox checkbox-accent'
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type='submit' className='w-full btn-primary  btn'>
          <span className='w-full'>Create Your Account</span>
        </button>
      </form>
    </>
  )
}

export default RegisterForm
