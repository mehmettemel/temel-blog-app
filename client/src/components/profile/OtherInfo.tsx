import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherInfo } from '../../redux/actions/profileActions'
import { IUser, RootStore } from '../../utils/Typescript'
import Loading from '../notifications/Loading'
interface IProps {
  id: string
}
const OtherInfo: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>()

  const { otherInfo } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return

    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id))
    } else {
      const newUser = otherInfo.find((user) => user._id === id)
      if (newUser) setOther(newUser)
    }
  }, [id, otherInfo, dispatch])

  if (!other) return <Loading />
  return (
    <div className='max-w-lg mx-auto my-5'>
      <div className='card bordered'>
        <div className='card-body'>
          <h2 className='card-title'>
            <span>Name:</span> {other.name}
          </h2>
          <p>
            <span>Email/Phone:</span> {other.account}
          </p>
          <div className='card-actions'>
            <button className='btn btn-primary'> {other.role}</button>
            <button className='btn btn-secondary'>
              {' '}
              Join Date: {new Date(other.createdAt).toLocaleString()}
            </button>
          </div>
        </div>
        <figure>
          <img src={other.avatar} alt='avatar' className='object-cover h-full' />
        </figure>
      </div>
    </div>
  )
}

export default OtherInfo
