import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import SignIn_SignUp_Hero2 from '../../assets/SignIn_SignUp_Hero2.jpg'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import Sign_In_Up_Header from '../Sign_In_Up_Header'

const Sign_In = () => {
  const { userEmail, userPassword, setUserEmail, setLoggedIn } = useContext(ProfileContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (email === userEmail && password === userPassword) {
      setUserEmail(email)
      setLoggedIn(true)
      navigate('/')
    } else {
      alert('Email or Password is wrong')
    }
  }

  return (
    <div className='Sign_Up relative min-h-screen bg-white'>
      <Sign_In_Up_Header />

      <img
        src={SignIn_SignUp_Hero2}
        alt="Hero"
        className='absolute inset-0 h-full w-full object-cover z-0'
      />

      <form
        onSubmit={handleSubmit}
        className=' absolute font-nunito z-10 flex flex-col w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-black bg-opacity-65 rounded-lg px-6 py-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      >
        <img src={Logo} alt="Logo" className='w-[60%] md:w-[70%] mx-auto mb-6' />

        {/* Email Field */}
        <div className='relative mb-6'>
          <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white'>
            <svg
              className='w-5 h-5'
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <input
            type="email"
            placeholder='Email'
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address"
            onChange={(e) => setEmail(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-white outline-none text-white placeholder-white hover:bg-opacity-20 transition'
          />
        </div>

        {/* Password Field */}
        <div className='relative mb-6'>
          <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white'>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-8h-1V7a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM9 7a3 3 0 1 1 6 0v2H9V7zm9 13H6v-9h12v9z" />
            </svg>
          </span>
          <input
            type="password"
            placeholder='Password'
            required
            minLength={8}
            title='Minimum length of 8 characters'
            onChange={(e) => setPassword(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-white outline-none text-white placeholder-white hover:bg-opacity-20 transition'
          />
        </div>

        <button
          type='submit'
          className='w-full mt-4 py-3 font-manrope rounded text-white bg-white bg-opacity-20 hover:bg-opacity-30 transition'
        >
          Sign In
        </button>

        <Link to='/sign_up' className='text-white text-[1.2rem] mt-6 mx-auto hover:underline'>
          Don't have an account?
        </Link>
      </form>
    </div>
  )
}

export default Sign_In
