import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IBlog, IParams, RootStore } from '../../utils/Typescript'
import { useHistory, useParams, Link } from 'react-router-dom'
import { getBlogsByUserId } from '../../redux/actions/blogActions'
import Loading from '../notifications/Loading'
import Pagination from '../global/Pagination'
const UserBlogs = () => {
  const dispatch = useDispatch()
  const { blogsByUser } = useSelector((state: RootStore) => state)

  const user_id = useParams<IParams>().slug
  const history = useHistory()
  const { search } = history.location

  const [blogs, setBlogs] = useState<IBlog[]>()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!user_id) return
    //this is prevents to refetch data
    if (blogsByUser.every((item) => item.id !== user_id)) {
      dispatch(getBlogsByUserId(user_id, search))
    } else {
      const data = blogsByUser.find((item) => item.id === user_id)
      if (!data) return

      setBlogs(data.blogs)
      setTotal(data.total)
      if (data.search) history.push(data.search)
    }
  }, [user_id, blogsByUser, dispatch, search, history])

  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByUserId(user_id, search))
  }

  if (!blogs) return <Loading />
  if (blogs.length === 0)
    return (
      <div className='alert alert-warning  my-4'>
        <div className='flex-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='w-6 h-6 mx-2 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            ></path>
          </svg>
          <label>This user does not have blog article</label>
        </div>
      </div>
    )
  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-neutral rounded-box shadow-sm my-4'>
      <div className='mb-10 border-t border-b divide-y'>
        {blogs.map((blog) => (
          <div key={blog._id} className='grid py-8 sm:grid-cols-4'>
            <div className='mb-4 sm:mb-0'>
              <div className='space-y-1 text-xs font-semibold tracking-wide uppercase'>
                <Link
                  to={`/blog/${blog._id}`}
                  className='transition-colors duration-200 text-primary hover:text-accent'
                >
                  {new Date(blog.createdAt).toLocaleString()}
                </Link>
              </div>
            </div>
            <div className='sm:col-span-3 lg:col-span-2'>
              <div className='mb-3'>
                <Link
                  to={`/blog/${blog._id}`}
                  className='inline-block text-accent-content transition-colors duration-200 hover:text-accent'
                >
                  <p className='text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl capitalize'>
                    {blog.title}
                  </p>
                </Link>
              </div>
              <p className='text-accent-content'>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  )
}

export default UserBlogs
