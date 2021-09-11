import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/notificationsTypes'
import AlertIcon from '../icons/AlertIcon'

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
          <AlertIcon />
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
