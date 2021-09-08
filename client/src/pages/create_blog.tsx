import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IBlog, RootStore } from '../utils/Typescript'
import Loading from '../components/notifications/Loading'
import CreateBlog from '../components/blog/CreateBlog'
import BlogPreview from '../components/blog/BlogPreview'

const Blog_Create = () => {
  const initState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString(),
  }
  const [blog, setBlog] = useState<IBlog>(initState)

  const { auth, categories } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  if (!auth.access_token) return <Loading />
  return (
    <div className='grid grid-cols-3 gap-4 w-full'>
      <div className='col-span-3 lg:col-span-2'>
        <CreateBlog blog={blog} setBlog={setBlog} />
      </div>
      <div className='col-span-3  lg:col-span-1 m-3 p-4'>
        <BlogPreview blog={blog} />
      </div>
    </div>
  )
}

export default Blog_Create
