import React from 'react'
import { RootStore } from '../../utils/Typescript'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import Toast from './Toast'
const Alert = () => {
  const { notification } = useSelector((state: RootStore) => state)
  return (
    <div>
      {notification.loading && <Loading />}
      {notification.errors && <Toast title='Errors' body={notification.errors} bgColor='bg-error' />}
      {notification.success && <Toast title='Errors' body={notification.success} bgColor='bg-success' />}
    </div>
  )
}

export default Alert
