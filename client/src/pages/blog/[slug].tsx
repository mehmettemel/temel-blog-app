import { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Loading from '../../components/notifications/Loading'
import { getAPI } from '../../utils/FetchData'
import { IBlog, IComment, IParams, IUser, RootStore } from '../../utils/Typescript'
import DisplayBlog from '../../components/blog/DisplayBlog'
import CommentInput from '../../components/comments/CommentInput'
import Comments from '../../components/comments/Comments'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createComment, getComments } from '../../redux/actions/commentActions'
import AlertIcon from '../../components/icons/AlertIcon'
import Pagination from '../../components/global/Pagination'
const BlogDetail = () => {
  const { auth, comments } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const id = useParams<IParams>().slug
  const history = useHistory()

  const [blog, setBlog] = useState<IBlog>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showComments, setShowComments] = useState<IComment[]>([])

  const handleComment = (body: string) => {
    if (!auth) return

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog?._id as string,
      blog_user_id: (blog?.user as IUser)._id,
      createdAt: new Date().toISOString(),
    }

    setShowComments([data, ...showComments])
    dispatch(createComment(data, auth.access_token))
  }

  const fetchComments = useCallback(
    async (id: string, num = 1) => {
      setLoading(true)
      await dispatch(getComments(id, num))
      setLoading(false)
    },
    [dispatch]
  )

  const handlePagination = (num: number) => {
    if (!blog?._id) return
    fetchComments(blog?._id, num)
  }

  useEffect(() => {
    if (!id) return

    setLoading(true)

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.msg)
        setLoading(false)
      })

    //cleanup function to ensure memory leak
    return () => setBlog(undefined)
  }, [id])

  useEffect(() => {
    setShowComments(comments.data)
  }, [comments.data])

  useEffect(() => {
    if (!blog?._id) return

    //stay same comment page after refresh
    const num = history.location.search.slice(6) || 1

    fetchComments(blog?._id, num)
  }, [fetchComments, blog?._id, history])

  if (blog === undefined) return <Loading />

  return (
    <div>
      <div>
        {error && (
          <div className='alert alert-error mt-5'>
            <div className='flex-1'>
              <AlertIcon />
              <label>{error}</label>
            </div>
          </div>
        )}
      </div>
      {blog && <DisplayBlog blog={blog} />}
      <div className='text-center my-4 flex flex-col space-y-4 max-w-lg mx-auto'>
        <h3 className='text-lg md:text-3xl font-extrabold text-accent'>Comments</h3>
        {loading ? (
          <Loading />
        ) : (
          showComments?.map((comment, index) => <Comments key={index} comment={comment} />)
        )}

        {comments.total > 1 && <Pagination total={comments.total} callback={handlePagination} />}

        {auth.user ? (
          <CommentInput callback={handleComment} />
        ) : (
          <div className='alert alert-warning'>
            <div className='flex-1'>
              <AlertIcon />
              <label>
                Please <Link to={`/login?blog/${blog?._id}`}>login</Link> to comment.
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogDetail
