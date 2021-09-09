import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams, RootStore } from '../../utils/Typescript'
import { useSelector } from 'react-redux'
import UserInfo from '../../components/profile/UserInfo'
import OtherInfo from '../../components/profile/OtherInfo'
import UserBlogs from '../../components/blog/UserBlogs'
const Profile = () => {
  const { slug }: IParams = useParams()
  const { auth } = useSelector((state: RootStore) => state)

  return (
    <>
      <h1 className='text-lg lg:text-4xl text-primary font-extrabold text-center mb-4'>⭐Profile Page⭐</h1>
      <div className='grid  grid-cols-1 md:grid-cols-2 gap-4 items-start'>
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo id={slug} />}
        <UserBlogs />
      </div>
    </>
  )
}

export default Profile
