import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import SignIn_SignUp_Hero2 from '../../assets/SignIn_SignUp_Hero2.jpg'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import Sign_In_Up_Header from '../Sign_In_Up_Header'

const Sign_In = () => {

  const {userEmail,userPassword,setUserEmail,setLoggedIn} = useContext(ProfileContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(){
    if(email===userEmail && password===userPassword){
      setUserEmail(email)
      setLoggedIn(true)
      navigate('/')
    }
    else
      alert('Email or Password is wrong')
  }

  return (
    <div className='Sign_Up relative h-[100vh] bg-white'>

      <Sign_In_Up_Header/>

      <img src={SignIn_SignUp_Hero2} alt="Hero image" className='h-full w-full object-cover'/>

      <form onSubmit={handleSubmit} className='SignIn_Container absolute flex flex-col h-[60vh] w-[23vw] bg-black bg-opacity-65 rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
          <img src={Logo} alt="Logo" className=' w-[70%] h-max mx-auto text-white text-3xl font-bold mt-10 mb-2' />

          <input 
          type="email" 
          placeholder='Email' 
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
          title="Please enter a valid email address"
          onChange={(e)=>setEmail(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-12 px-2 py-2 bg-black bg-opacity-0 border-b-2 border-white outline-none text-white
          placeholder-white hover:bg-opacity-35 '/>

          <input 
          type="password" 
          placeholder='Password' 
          required
          minLength={8}
          title='Minimum length on 8 characters'
          onChange={(e)=>setPassword(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-12 px-2 py-2 bg-black bg-opacity-0 border-b-2 border-white outline-none text-white
          placeholder-white hover:bg-opacity-35 '/>

          <button 
          className=' w-[50%] h-max mx-auto p-2 rounded text-white mt-14 bg-white bg-opacity-15 hover:bg-opacity-25' type='submit'>Sign In</button>

          <Link to='/sign_up' className=' w-max h-max mx-auto text-white mt-6'>Don't have an account ?</Link>
      </form>

    </div>
  )
}

export default Sign_In