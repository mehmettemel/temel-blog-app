import React from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { googleLogin } from '../../redux/actions/authActions'
const SocialLogin = () => {
  const dispatch = useDispatch()

  //GOOGLE
  const onSuccessFn = (response: any) => {
    const id_token = response.getAuthResponse().id_token
    dispatch(googleLogin(id_token))
  }
  const onFailure = (response: GoogleLoginResponse) => {
    console.log(response)
  }
  return (
    <div className='mt-4 flex flex-col space-y-4'>
      <GoogleLogin
        clientId='830132547452-ik6m3j83gpje1ir5t58nph6dd4nf2sfj.apps.googleusercontent.com'
        render={(renderProps) => (
          <button
            className='btn sm:btn-sm xl:btn-md btn-accent  mx-auto '
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign in with Google
          </button>
        )}
        buttonText='Login with Google'
        onSuccess={onSuccessFn}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
      ,
    </div>
  )
}

export default SocialLogin
