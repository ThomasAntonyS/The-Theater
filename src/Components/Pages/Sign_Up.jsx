import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import SignIn_SignUp_Hero1 from '../../assets/SignIn_SignUp_Hero1.jpg'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import Sign_In_Up_Header from '../Sign_In_Up_Header'


const Sign_Up = () => {
  const { setUserName, setUserEmail, setUserPassword } = useContext(ProfileContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setUserName(name)
    setUserEmail(email)
    setUserPassword(password)
    navigate('/sign_in')
  }

  return (
    <div className='Sign_Up relative min-h-screen bg-white'>

      <Sign_In_Up_Header />

      <img src={SignIn_SignUp_Hero1} alt="Hero image" className='absolute inset-0 h-full w-full object-cover z-0' />

      <form
        onSubmit={handleSubmit}
        className='SignUp_container absolute z-10 flex flex-col w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-black bg-opacity-65 rounded-lg px-6 py-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      >
        <img src={Logo} alt="Logo" className='w-[60%] md:w-[70%] mx-auto mb-4' />

        {/* Name Field */}
        <div className="relative mt-6">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
            <ProfileIcon className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder='Full Name'
            required
            pattern='[a-zA-Z ]+$'
            minLength={5}
            title='Must contain only letters'
            onChange={(e) => setName(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-white outline-none text-white placeholder-white hover:bg-opacity-20 transition'
          />
        </div>

        {/* Email Field */}
        <div className="relative mt-6">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
            <EmailIcon className="w-5 h-5" />
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
        <div className="relative mt-6">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
            <PasswordIcon className="w-5 h-5" />
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
          className='w-full mt-8 py-3 rounded text-white bg-white bg-opacity-20 hover:bg-opacity-30 transition'
        >
          Sign Up
        </button>

        <Link to='/sign_in' className='text-white text-sm mt-6 mx-auto hover:underline'>
          Already have an account?
        </Link>
      </form>

    </div>
  )
}

export default Sign_Up

const PasswordIcon = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-8h-1V7a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM9 7a3 3 0 1 1 6 0v2H9V7zm9 13H6v-9h12v9z" />
  </svg>
)

const ProfileIcon = ({ className }) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
    <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998" transform="translate(-84 -1999)" />
  </svg>
)

const EmailIcon = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.104 0 2-.897 2-2V6c0-1.103-.896-2-2-2zm0 2v.511l-8 4.989-8-4.989V6h16zM4 18V8.021l8 4.99 8-4.99L20.002 18H4z" />
  </svg>
)


