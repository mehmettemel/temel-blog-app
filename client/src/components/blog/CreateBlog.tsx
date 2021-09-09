import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormSubmit, IBlog, InputChange, RootStore } from '../../utils/Typescript'
import Quill from '../editor/ReactQuill'
import { validCreateBlog } from '../../utils/Valid'
import { ALERT } from '../../redux/types/notificationsTypes'
import { createBlog } from '../../redux/actions/blogActions'
interface IProps {
  blog: IBlog
  setBlog: (blog: IBlog) => void
}

const CreateBlog: React.FC<IProps> = ({ blog, setBlog }) => {
  const [body, setBody] = useState('')
  const [text, setText] = useState('')

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = divRef.current
    if (!div) return
    const text = div?.innerText as string
    setText(text)
  }, [body])

  const { categories, auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setBlog({ ...blog, [name]: value })
  }

  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      const file = files[0]
      setBlog({ ...blog, thumbnail: file })
    }
  }

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault()
    if (!auth.access_token) return

    const check = validCreateBlog({ ...blog, content: text })
    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
    }

    let newData = { ...blog, content: body }

    dispatch(createBlog(newData, auth.access_token))
  }
  return (
    <section className='p-6 '>
      <form
        onSubmit={handleSubmit}
        className='container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid'
      >
        <fieldset className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-200'>
          <div className='space-y-2 col-span-full lg:col-span-1'>
            <p className='font-medium'>Create Blog Post</p>
            <p className='text-xs'>Create your blog post and preview it</p>
          </div>
          <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
            <div className='col-span-full  relative space-y-3'>
              <label htmlFor='title' className='text-md font-semibold'>
                Title
              </label>
              <input
                onChange={handleChangeInput}
                value={blog.title}
                id='title'
                name='title'
                type='text'
                placeholder='Javascript is Great'
                className='w-full input input-accent input-bordered'
              />
              <small className='font-thin text-accent absolute bottom-0 right-2 '>
                {blog.title.length}/50
              </small>
            </div>

            <div className='col-span-full  space-y-3 relative'>
              <label htmlFor='bio' className='text-sm font-semibold'>
                Description
              </label>
              <textarea
                onChange={handleChangeInput}
                value={blog.description}
                name='description'
                id='description'
                placeholder=''
                className='w-full textarea h-24 textarea-bordered textarea-accent resize-none'
              ></textarea>
              <small className='font-thin text-accent absolute bottom-3 right-2 '>
                {blog.description.length}/200
              </small>
            </div>
            <div className='col-span-full sm:col-span-3 space-y-3 '>
              <label htmlFor='bio' className='text-sm'>
                Thumbnail
              </label>
              <div className='flex items-center space-x-2'>
                <button className='btn btn-primary relative w-full'>
                  <div className='absolute top-0 left-0'>
                    <input
                      type='file'
                      className='opacity-0 z-0 absolute cursor-pointer '
                      accept='image/*'
                      onChange={handleChangeThumbnail}
                    />
                  </div>
                  Add Thumbnail
                </button>
              </div>
            </div>
            <div className='col-span-full sm:col-span-3  space-y-3'>
              <label htmlFor='categories' className='text-sm font-semibold'>
                Categories
              </label>
              <div>
                <select
                  value={blog.category}
                  onChange={handleChangeInput}
                  name='category'
                  className='select select-bordered select-accent w-full max-w-xs'
                >
                  <option value=''>Select your category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='col-span-4 bg-white text-black'>
            <Quill setBody={setBody} />
          </div>
          <div className='hidden' ref={divRef} dangerouslySetInnerHTML={{ __html: body }} />
          <div className='col-span-4 justify-items-end grid'>
            <button className='btn btn-secondary' type='submit'>
              Create Blog
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default CreateBlog
