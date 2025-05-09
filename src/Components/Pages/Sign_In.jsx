import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import Sign_In_Up_Header from '../Sign_In_Up_Header'
import BG_IMG from '../../assets/BG_IMAGE.jpg'

const Sign_In = () => {
  const { userEmail, userPassword, setUserEmail, setLoggedIn } = useContext(ProfileContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
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
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${BG_IMG})` }}>
      <Sign_In_Up_Header />
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-50 backdrop-blur-md text-white rounded-lg w-[90%] md:w-[70%] lg:w-[40%] xl:w-[25%] p-4 sm:p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6 font-manrope">Sign In</h2>

          <div className="mb-6 relative">
            <label htmlFor="email" className="block text-sm mb-2 font-nunito">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-transparent font-manrope border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm mb-2 font-nunito">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              required
              minLength={8}
              title="Minimum length of 8 characters"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-transparent font-manrope border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-white font-nunito">Show Password</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-manrope rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300 font-nunito">
              Don't have an account?{' '}
              <Link to="/sign_up" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Sign_In
