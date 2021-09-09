import React from 'react'
import { IBlog } from '../../utils/Typescript'
import { Link } from 'react-router-dom'
interface IProps {
  blog: IBlog
}

const BlogCard: React.FC<IProps> = ({ blog }) => {
  return (
    <div className='card shadow-xl image-full'>
      <figure>{typeof blog.thumbnail === 'string' && <img src={blog.thumbnail} alt='thumbnail' />}</figure>
      <div className='justify-end card-body'>
        <h2 className='card-title'>
          <Link to={`/blog/${blog._id}`}>{blog.title.slice(0, 50) + '...'}</Link>
        </h2>
        <p>{blog.description.slice(0, 100) + '...'}</p>
        <div className='card-actions'>
          <div className='badge badge-lg badge-primary'>
            {' '}
            {typeof blog.user !== 'string' && (
              <Link to={`/profile/${blog.user._id}`}>By: {blog.user.name}</Link>
            )}
          </div>
          <div className='badge badge-lg badge-secondary'>{new Date(blog.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
