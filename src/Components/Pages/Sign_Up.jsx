import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import SignIn_SignUp_Hero1 from '../../assets/SignIn_SignUp_Hero1.jpg'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import Sign_In_Up_Header from '../Sign_In_Up_Header'

const Sign_Up = () => {

  const {setUserName,setUserEmail,setUserPassword} = useContext(ProfileContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(){
    setUserName(name)
    setUserEmail(email)
    setUserPassword(password)
    navigate('/sign_in')
  }

  return (
    <div className='Sign_Up relative h-[100vh] bg-white'>

      <Sign_In_Up_Header/>

      <img src={SignIn_SignUp_Hero1} alt="Hero image" className=' h-full w-full object-cover'/>

      <form onSubmit={handleSubmit} className='SignUp_container absolute flex flex-col h-[67vh] w-[23vw] bg-black bg-opacity-65 rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <img src={Logo} alt="Logo" className=' w-[70%] h-max mx-auto text-white text-3xl font-bold mt-10 mb-2' />

          <input 
          type="text" 
          placeholder='Full Name' 
          required
          pattern={"[a-zA-Z]+$"}
          minLength={5}
          title='Must contain only characters'
          onChange={(e)=>setName(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-10 px-2 py-2 bg-black bg-opacity-0 hover:bg-opacity-35 border-b-2 border-white outline-none text-white
          placeholder-white '/>

          <input 
          type="email" 
          placeholder='Email' 
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
          title="Please enter a valid email address"
          onChange={(e)=>setEmail(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-10 px-2 py-2 bg-black bg-opacity-0 hover:bg-opacity-35 border-b-2 border-white outline-none text-white
          placeholder-white '/>

          <input 
          type="password" 
          placeholder='Password' 
          required
          minLength={8}
          title='Minimum length on 8 characters'
          onChange={(e)=>setPassword(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-10 px-2 py-2 bg-black bg-opacity-0 hover:bg-opacity-35 border-b-2 border-white outline-none text-white
          placeholder-white '/>

          <button 
          className=' w-[50%] h-max mx-auto p-2 rounded text-white mt-10 bg-white bg-opacity-15 hover:bg-opacity-25' type='submit'>Sign Up</button>

          <Link to='/sign_in' className=' w-max h-max mx-auto text-white mt-6'>Already have an account ?</Link>
      </form>

    </div>
  )
}

export default Sign_Up