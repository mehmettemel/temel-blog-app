import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment, replyComment, updateComment } from '../../redux/actions/commentActions'
import { IComment, RootStore } from '../../utils/Typescript'
import CommentInput from './CommentInput'
import EditIcon from '../icons/EditIcon'
import TrashIcon from '../icons/TrashIcon'

interface IProps {
  comment: IComment
}
const Comments: React.FC<IProps> = ({ comment }) => {
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [onReply, setOnReply] = useState(false)
  const [showReply, setShowReply] = useState<IComment[]>([])
  const [next, setNext] = useState(2)
  const [edit, setEdit] = useState<IComment>()

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    }
    setShowReply([...showReply, data])
    dispatch(replyComment(data, auth.access_token))
    setOnReply(false)
  }

  const handleDelete = (comment: IComment) => {
    if (!auth.user || !auth.access_token) return
    dispatch(deleteComment(comment, auth.access_token))
  }

  const handleUpdate = (body: string) => {
    if (!auth.user || !auth.access_token || !edit) return
    if (body === edit.content) return setEdit(undefined)

    const newComment = { ...edit, content: body }
    dispatch(updateComment(newComment, auth.access_token))

    setEdit(undefined)
  }

  useEffect(() => {
    if (!comment.replyCM) return
    setShowReply(comment.replyCM)
  }, [comment.replyCM])

  const Nav = (comment: IComment) => {
    return (
      <div className='flex space-x-3 cursor-pointer'>
        <span onClick={() => setEdit(comment)}>
          <EditIcon />
        </span>
        <span onClick={() => handleDelete(comment)}>
          <TrashIcon />
        </span>
      </div>
    )
  }
  return (
    <>
      <div className='alert flex flex-col w-full max-w-lg  mx-auto divide-y  divide-accent bg-neutral rounded-box space-y-4'>
        {edit ? (
          <CommentInput callback={handleUpdate} edit={edit} setEdit={setEdit} />
        ) : (
          <>
            <div className='flex justify-between p-4'>
              <div className='flex space-x-4'>
                <div>
                  <img
                    src={comment?.user?.avatar}
                    alt='avatar'
                    className='object-cover w-12 h-12 rounded-full '
                  />
                </div>
                <div>
                  <h4 className='font-bold'>
                    {' '}
                    <Link to={`/profile/${comment?.user?._id}`}>{comment?.user?.name}</Link>
                  </h4>
                  <span className='text-xs '>{new Date(comment?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div
              className='p-4 space-y-2 text-sm '
              dangerouslySetInnerHTML={{
                __html: comment?.content,
              }}
            ></div>
          </>
        )}
        <div className='flex justify-center pt-3 cursor-pointer'>
          {comment.blog_user_id === auth.user?._id ? (
            comment.user?._id === auth.user._id ? (
              Nav(comment)
            ) : (
              <span onClick={() => handleDelete(comment)}>
                {' '}
                <TrashIcon />
              </span>
            )
          ) : (
            comment.user?._id === auth.user?._id && Nav(comment)
          )}
        </div>
        <div className='divider-vertical w-full max-w-lg mx-auto'>
          {onReply && <CommentInput callback={handleReply} />}
          <div className='btn btn-outline btn-accent mt-4' onClick={() => setOnReply(!onReply)}>
            {onReply ? ' Cancel ' : ' Reply '}
          </div>
          <div></div>
        </div>
        {showReply.slice(0, next).map((reply, index) => (
          <div>
            <div className='alert flex flex-col w-full max-w-lg  mx-auto divide-y  divide-accent bg-neutral rounded-box space-y-4'>
              <div className='flex justify-between p-4'>
                <div className='flex space-x-4'>
                  <div>
                    <img
                      src={reply?.user?.avatar}
                      alt='avatar'
                      className='object-cover w-12 h-12 rounded-full '
                    />
                  </div>
                  <div>
                    <h4 className='font-bold'>
                      {' '}
                      <Link to={`/profile/${reply?.user?._id}`}>{reply?.user?.name}</Link>
                    </h4>
                    <span className='text-xs '>{new Date(reply?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div
                className='p-4 space-y-2 text-sm '
                dangerouslySetInnerHTML={{
                  __html: reply?.content,
                }}
              ></div>
            </div>
            <div className='flex justify-center pt-3 cursor-pointer'>
              {reply.blog_user_id === auth.user?._id ? (
                reply.user?._id === auth.user._id ? (
                  Nav(reply)
                ) : (
                  <span onClick={() => handleDelete(comment)}>
                    <TrashIcon />
                  </span>
                )
              ) : (
                reply.user?._id === auth.user?._id && Nav(reply)
              )}
            </div>
          </div>
        ))}
        <div className='p-3'>
          {showReply.length - next > 0 ? (
            <small className='btn btn-sm  btn-outline' onClick={() => setNext(next + 2)}>
              See more comments...
            </small>
          ) : (
            showReply.length > 2 && (
              <small className='btn btn-sm  btn-outline' onClick={() => setNext(2)}>
                Hide comments...
              </small>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Comments
