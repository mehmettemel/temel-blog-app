import React, { useEffect, useRef, useState } from 'react'
import { IComment } from '../../utils/Typescript'
import LiteQuill from '../editor/LiteQuill'

interface IProps {
  edit?: IComment
  setEdit?: (edit?: IComment) => void
  callback: (body: string) => void
}
const CommentInput: React.FC<IProps> = ({ callback, edit, setEdit }) => {
  const [body, setBody] = useState('')

  useEffect(() => {
    if (edit) setBody(edit.content)
  }, [edit])

  const handleSubmit = () => {
    callback(body)
    setBody('')
  }
  return (
    <div className='bg-accent-content text-black'>
      <LiteQuill body={body} setBody={setBody} />
      <button onClick={handleSubmit} className='btn btn-primary m-4'>
        {edit ? 'Update Comment' : 'Add Comment'}
      </button>
    </div>
  )
}

export default CommentInput
