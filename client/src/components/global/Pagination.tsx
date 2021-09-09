import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
interface IProps {
  total: number
  callback: (num: number) => void
}
const Pagination: React.FC<IProps> = ({ total, callback }) => {
  const [page, setPage] = useState(1)

  const history = useHistory()

  const newArr = [...Array(total)].map((_, i) => i + 1)

  const isActive = (index: number) => {
    if (index === page) return 'btn-active'
  }

  const handlePagination = (num: number) => {
    history.push(`?page=${num}`)
    callback(num)
  }

  useEffect(() => {
    // console.log(history)
    const num = history.location.search.slice(6) || 1
    setPage(Number(num))
  }, [history.location.search])
  return (
    <div className='flex justify-center'>
      <div className='btn-group '>
        {page > 1 && (
          <button className='btn' onClick={() => handlePagination(page - 1)}>
            Previous
          </button>
        )}

        {newArr.map((num) => (
          <button key={num} className={`btn ${isActive(num)}`} onClick={() => handlePagination(num)}>
            {num}
          </button>
        ))}
        {/* <button className='btn btn-active'>2</button> */}
        {page < total && (
          <button className='btn' onClick={() => handlePagination(page + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
