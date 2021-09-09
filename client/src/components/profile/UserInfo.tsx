import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormSubmit, InputChange, IUserProfile, RootStore } from '../../utils/Typescript'
import { resetPassword, updateUser } from '../../redux/actions/profileActions'
import Loading from '../notifications/Loading'
const UserInfo = () => {
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const initState = {
    name: '',
    account: '',
    avatar: '',
    password: '',
    cf_password: '',
  }
  const [user, setUser] = useState<IUserProfile>(initState)
  const [typePass, setTypePass] = useState(false)
  const { name, avatar, password, cf_password } = user

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      const file = files[0]
      setUser({ ...user, avatar: file })
    }
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (avatar || name) dispatch(updateUser(avatar as File, name, auth))

    if (password && auth.access_token) dispatch(resetPassword(password, cf_password, auth.access_token))
  }

  if (!auth.user) return <Loading />
  return (
    <div className='flex flex-col px-4 py-8  bg-neutral  shadow-lg  my-5 max-w-2xl mx-auto rounded-box'>
      <div className='self-center mb-2 text-xl font-bold sm:text-2xl text-white'>User Information</div>

      <div className='p-6'>
        <form action='#' onSubmit={handleSubmit}>
          <div className='avatar my-6 '>
            <div className=' rounded-box w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2 relative'>
              <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt='avatar' />
              <div className='absolute bg-accent bg-opacity-50 bottom-0 w-full flex justify-center '>
                <label htmlFor='file_up'></label>
                <input
                  className='opacity-0 z-0 absolute cursor-pointer'
                  type='file'
                  accept='image/*'
                  name='file'
                  id='file_up'
                  onChange={handleChangeFile}
                />
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
                    d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex flex-col mb-2'>
            <div className=' relative '>
              <input
                type='text'
                id='name'
                defaultValue={auth.user.name}
                onChange={handleChangeInput}
                className=' input input-primary input-bordered w-full'
                name='name'
                placeholder='Your name'
              />
            </div>
          </div>
          <div className='flex flex-col mb-2 '>
            <div className=' relative flex-1'>
              <input
                type='text'
                id='account'
                name='account'
                defaultValue={auth.user?.account}
                onChange={handleChangeInput}
                disabled={true}
                className=' input input-primary input-bordered w-full'
                placeholder='Your email'
              />
            </div>
          </div>
          {auth.user.type !== 'register' && (
            <div className='badge badge-outline badge-error my-4'>
              *Quick login accounts with {auth.user.type} cannot use this functionality
            </div>
          )}

          <div className='flex gap-4 mb-2'>
            <div className='relative flex-1'>
              <input
                type={typePass ? 'text' : 'password'}
                id='password'
                className='input input-primary input-bordered w-full'
                name='password'
                value={password}
                onChange={handleChangeInput}
                placeholder='Your Password'
                disabled={auth.user.type !== 'register'}
              />
              <small className='form-control w-20' onClick={() => setTypePass(!typePass)}>
                <label className='cursor-pointer label'>
                  <span className='label-text'>{'Show'}</span>
                  <input
                    type='checkbox'
                    checked={typePass ? true : false}
                    className='checkbox checkbox-accent'
                  />
                </label>
              </small>
            </div>
            <div className=' relative flex-1 '>
              <input
                type={typePass ? 'text' : 'password'}
                id='cf_password'
                className='input input-primary input-bordered w-full'
                name='cf_password'
                value={cf_password}
                onChange={handleChangeInput}
                placeholder='Confirmation Password'
                disabled={auth.user.type !== 'register'}
              />
            </div>
          </div>

          <div className='flex w-full my-4'>
            <button type='submit' className='btn btn-accent w-full'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserInfo
