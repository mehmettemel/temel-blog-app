import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams, RootStore } from '../../utils/Typescript'
import { useSelector } from 'react-redux'
import UserInfo from '../../components/profile/UserInfo'
const Profile = () => {
  const { slug }: IParams = useParams()
  const { auth } = useSelector((state: RootStore) => state)
  return (
    <>
      <h2>Profile</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 px-4'>
        <UserInfo />
        <div></div>
      </div>
    </>
  )
}

export default Profile
