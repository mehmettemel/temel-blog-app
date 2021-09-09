import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/Typescript'
import { Link } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard'
import Loading from '../components/notifications/Loading'
const Home = () => {
  const { blogs } = useSelector((state: RootStore) => state)
  if (blogs.length === 0) return <Loading />
  return (
    <>
      <div className='p-5'>
        <h1 className='text-lg lg:text-4xl text-primary font-extrabold text-center mb-4'>
          ⭐Temel Blog App⭐
        </h1>
        {blogs.map((blog) => (
          <div key={blog._id}>
            {blog.count > 0 && (
              <>
                <h3 className='text-md lg:text-2xl text-accent'>
                  <Link to={`/blogs/${blog.name.toLowerCase()}`}>
                    {blog.name} <small>({blog.count})</small>
                  </Link>
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3'>
                  {blog.blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
                <div className='divider'>
                  {blog.count > 4 && (
                    <Link className='block font-bold text-secondary mt-2 mb-3' to={`/blogs/${blog.name}`}>
                      Read more &gt;&gt;
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
