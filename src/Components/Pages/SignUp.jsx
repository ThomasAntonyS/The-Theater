import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import SignIn_SignUp_Hero1 from '../../assets/SignIn_SignUp_Hero1.jpg'
import { ProfileContext } from '../../Context/ProfileContextProvider'

const SignUp = () => {

  const {setUserName,setUserEmail} = useContext(ProfileContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(){
    setUserName(name)
    setUserEmail(email)
    navigate('/sign_in')
  }

  return (
    <div className='Sign_Up relative h-[100vh] bg-white'>

      <img src={SignIn_SignUp_Hero1} alt="Hero image" className=' h-full w-full object-cover'/>

      <section className=' absolute flex flex-col h-[67vh] w-[25vw] bg-black bg-opacity-75 rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <img src={Logo} alt="Logo" className=' w-[80%] h-max mx-auto text-white text-3xl font-bold mt-10' />

          <input 
          type="text" 
          placeholder='Full Name' 
          required
          minLength={3}
          onChange={(e)=>setName(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-10 px-2 py-2 bg-transparent border-b-2 border-white outline-none text-white
          placeholder-white '/>

          <input 
          type="email" 
          placeholder='Email' 
          required
          onChange={(e)=>setEmail(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-10 px-2 py-2 bg-transparent border-b-2 border-white outline-none text-white
          placeholder-white '/>

          <input 
          type="password" 
          placeholder='Password' 
          required
          minLength={8}
          onChange={(e)=>setPassword(e.target.value)}
          className=' h-max w-[80%] mx-auto mt-10 px-2 py-2 bg-transparent border-b-2 border-white outline-none text-white
          placeholder-white '/>

          <button 
          className=' w-[50%] h-max mx-auto p-2 rounded text-white mt-10 bg-white bg-opacity-15 hover:bg-opacity-25'
          onClick={handleSubmit}
          >Sign Up</button>

          <Link to='/signin' className=' w-max h-max mx-auto text-white mt-6'>Already have an account ?</Link>
      </section>

    </div>
  )
}

export default SignUp