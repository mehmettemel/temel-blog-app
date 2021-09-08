import React, { useEffect, useState } from 'react'
import { FormSubmit, ICategory, RootStore } from '../utils/Typescript'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/notifications/Loading'
import { createCategory, deleteCategory, updateCategory } from '../redux/actions/categoryActions'
const Category = () => {
  const [name, setName] = useState('')
  const [edit, setEdit] = useState<ICategory | null>(null)

  const { auth, categories } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (edit) setName(edit.name)
    if (edit === null) setName('')
  }, [edit, setEdit])

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (!auth.access_token || !name) return

    if (edit) {
      if (edit.name === name) return
      const data = { ...edit, name }
      dispatch(updateCategory(data, auth.access_token))
    } else {
      dispatch(createCategory(name, auth.access_token))
    }

    setName('')
    setEdit(null)
  }

  const handleDelete = (id: string) => {
    if (!auth.access_token) return
    dispatch(deleteCategory(id, auth.access_token))
  }

  if (auth.user?.role !== 'admin') return <Loading />
  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto p-4 my-4 bg-base-200 rounded-box '>
        <div>
          <label className='label'>
            <span className='label-text font-bold text-md'>Create Category</span>
          </label>
          <div className='relative'>
            {edit && (
              <div onClick={() => setEdit(null)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 absolute right-24 top-3 z-10 cursor-pointer'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>
            )}
            <input
              type='text'
              name='category'
              id='category'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Javascript,Node.js,Next.js...'
              className='w-full pr-16 input input-primary input-bordered'
            />
            <button type='submit' className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
              {edit ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div className='max-w-lg mx-auto p-4 my-5 bg-base-200 rounded-box'>
        <h2 className='text-center font-extrabold text-lg'>Categories</h2>
        <div className='flex flex-col my-4 space-y-3 '>
          {categories.map((category) => (
            <div key={category._id} className='alert alert-info'>
              <div className='flex-1'>
                <label className='mx-3'>{category.name}</label>
              </div>
              <div className='flex-none'>
                <button className='btn btn-sm btn-warning mr-2' onClick={() => setEdit(category)}>
                  Edit
                </button>
                <button className='btn btn-sm btn-error' onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Category
