import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/Typescript'
import { postAPI } from '../../utils/FetchData'
import Toast from '../../components/notifications/Toast'
const Active = () => {
  const { slug }: IParams = useParams()
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  useEffect(() => {
    if (slug) {
      postAPI('active', { active_token: slug })
        .then((res) => setSuccess(res.data.msg))
        .catch((err) => setErr(err.response.data.msg))
    }
  }, [slug])
  return (
    <div>
      {err && <Toast title='Error' body={err} bgColor='bg-error' />}
      {success && <Toast title='Error' body={success} bgColor='bg-success' />}
    </div>
  )
}

export default Active
