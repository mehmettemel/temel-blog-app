import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions'
import { RootStore } from '../../utils/Typescript'
const Header = () => {
  const [setDrawer, setSetDrawer] = useState(false)
  const [search, setSearch] = useState('')

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSetDrawer(false)
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const drawerRef = useRef(null)
  useOutsideAlerter(drawerRef)

  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const bfLoginLinks = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
  ]
  const afLoginLinks = [
    { label: 'Home', path: '/' },
    { label: 'Create Blog', path: '/create_blog' },
  ]

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks
  return (
    <>
      <div className=' container mx-auto navbar mt-2 shadow-lg bg-neutral text-neutral-content rounded-box '>
        <div className='flex-none lg:flex'>
          <button className='btn btn-square btn-ghost' onClick={() => setSetDrawer(!setDrawer)}>
            {!setDrawer ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-6 h-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='inline-block w-6 h-6 stroke-current'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            )}
          </button>
        </div>
        <div className='flex-1 hidden px-2 mx-2 lg:flex'>
          <Link to='/'>
            <span className='text-lg font-bold'>Temel Blog</span>
          </Link>
        </div>
        <div className='flex-1 lg:flex-none mr-2'>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='input input-ghost'
            />
          </div>
        </div>
        <div className='flex-none mr-2'>
          <button className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-6 h-6 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </button>
        </div>

        {auth.user && (
          <div className='flex-none cursor-pointer'>
            <Link to={`/profile/${auth.user._id}`}>
              <div className='avatar'>
                <div className='rounded-full w-10 h-10 m-1'>
                  <img src={auth.user.avatar} alt={auth.user.name} />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      {setDrawer ? (
        <div ref={drawerRef} className='py-4 absolute left-0 right-0 max-w-md mx-auto px-4 z-30 '>
          <ul className='menu py-3 shadow-lg bg-base-100 rounded-box space-y-2'>
            {navLinks.map((item, index) => (
              <li key={index} className='menu-title'>
                <Link to={item.path}>
                  <span className='text-lg'>{item.label}</span>
                </Link>
              </li>
            ))}
            {auth.user?.role === 'admin' && (
              <li className='menu-title'>
                <Link to={`/category`}>
                  <span className='text-lg'>Category</span>
                </Link>
              </li>
            )}
            {auth.user && (
              <>
                <li className='menu-title'>
                  <Link to={`/profile/${auth.user._id}`}>
                    <span className='text-lg'>Your Profile</span>
                  </Link>
                </li>
                <li>
                  <div className='btn btn-primary btn-outline mx-2' onClick={() => dispatch(logout())}>
                    Logout
                  </div>
                </li>
              </>
            )}

            <li>
              <button className='btn btn-primary mx-2' onClick={() => setSetDrawer(false)}>
                Close Menu
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  )
}

export default Header
