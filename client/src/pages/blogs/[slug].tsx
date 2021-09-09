import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../components/notifications/Loading'
import { getBlogsByCategoryId } from '../../redux/actions/blogActions'
import BlogCard from '../../components/blog/BlogCard'
import { RootStore, IParams, IBlog } from '../../utils/Typescript'
import Pagination from '../../components/global/Pagination'

const BlogsByCategoryId = () => {
  const { categories, blogsByCategory } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [categoryId, setCategoryId] = useState('')

  const { slug } = useParams<IParams>()
  const history = useHistory()
  const { search } = history.location

  const [blogs, setBlogs] = useState<IBlog[]>()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const category = categories.find((item) => item.name === slug)

    if (category) setCategoryId(category._id)
  }, [slug, categories])

  useEffect(() => {
    if (!categoryId) return

    if (blogsByCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search))
    } else {
      const data = blogsByCategory.find((item) => item.id === categoryId)
      if (!data) return
      setBlogs(data.blogs)
      setTotal(data.total)

      //we cannot lose our specific pagination
      if (data.search) history.push(data.search)
    }
  }, [categoryId, blogsByCategory, dispatch, search, history])

  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByCategoryId(categoryId, search))
  }

  if (!blogs) return <Loading />
  return (
    <section className='py-6 sm:py-12 '>
      <div className='container p-6 mx-auto space-y-8'>
        <div className='space-y-2 text-center'>
          <h2 className='text-3xl font-bold text-accent uppercase'>{slug}</h2>
          <p className=' text-sm  font-bold'>Articles about category of {slug}</p>
        </div>
        <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4'>
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </section>
  )
}

export default BlogsByCategoryId
