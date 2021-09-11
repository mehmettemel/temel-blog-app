import React from 'react'
import { IBlog } from '../../utils/Typescript'

interface IProps {
  blog: IBlog
}
const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  return (
    <div className='max-w-3xl mx-auto p-2 md:p-4 '>
      <div className='card bordered'>
        <figure>{typeof blog.thumbnail === 'string' && <img src={blog.thumbnail} alt='Blog Image' />}</figure>
        <div className='card-body'>
          <h2 className='card-title flex flex-col items-center justify-center space-y-2 capitalize text-lg md:text-3xl'>
            {blog.title}
            <div className='badge  mx-2 badge-secondary'> {new Date(blog.createdAt).toDateString()}</div>
          </h2>
          <p
            className='leading-8'
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></p>
          <div className='justify-end card-actions'>
            <button className='btn btn-secondary'>
              {typeof blog.user !== 'string' && `By: ${blog.user.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayBlog
