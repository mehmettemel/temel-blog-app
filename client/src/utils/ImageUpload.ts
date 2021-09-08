export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg']
  let err = ''
  if (!file) return (err = 'File does not exists')
  if (file.size > 1024 * 1024)
    //1mb
    err = 'The largest image size is 1MB'
  if (!types.includes(file.type)) err = 'The image format should be JPEG or PNG'

  return err
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'temel-blog')
  formData.append('cloud_name', 'dv4i7j6jq')

  const res = await fetch('https://api.cloudinary.com/v1_1/dv4i7j6jq/image/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  return { public_id: data.public_id, url: data.secure_url }
}
