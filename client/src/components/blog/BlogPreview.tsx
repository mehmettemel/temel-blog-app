import React from 'react'
import { IBlog } from '../../utils/Typescript'
import { Link } from 'react-router-dom'
interface IProps {
  blog: IBlog
}
const BlogPreview: React.FC<IProps> = ({ blog }) => {
  return (
    <>
      {blog.title && (
        <div className='card bordered '>
          <figure>
            {blog.thumbnail && (
              <>
                {typeof blog.thumbnail === 'string' ? (
                  <Link to={`/blog/${blog._id}`}>
                    <img src={blog.thumbnail} className='w-full object-cover' alt='thumbnail' />
                  </Link>
                ) : (
                  <img
                    src={URL.createObjectURL(blog.thumbnail)}
                    className='w-full object-cover'
                    alt='thumbnail'
                  />
                )}
              </>
            )}
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>{blog.title}</h2>
            <p>{blog.description}</p>
            <div className='card-actions'>
              <div className='badge badge-primary'>{new Date(blog.createdAt).toLocaleString()}</div>
              {/* {blog.category && <div className='badge badge-ghost'>{blog.category}</div>} */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogPreview
