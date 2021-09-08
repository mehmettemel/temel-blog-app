import React from 'react'

const Loading = () => {
  return (
    <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className=' w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary'></div>
    </div>
  )
}

export default Loading
