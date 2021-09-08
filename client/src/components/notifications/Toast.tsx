import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/notificationsTypes'

interface IProps {
  title: string
  body: string | string[]
  bgColor: string
}

const Toast = ({ title, body, bgColor }: IProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: ALERT, payload: {} })
    }, 5000)
  }, [])

  return (
    <div className=' fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  fade-in '>
      <div className={`alert ${bgColor}`}>
        <div className='flex-1 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#ffffff'
            className='w-6 h-6 mx-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <label>
            <p className='text-sm text-base-content text-opacity-60'>
              {typeof body === 'string' ? body : body.map((text, index) => <p key={index}>{text}</p>)}
            </p>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Toast
