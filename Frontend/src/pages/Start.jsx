import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen  bg-cover bg-center lg:bg-center bg-[url(https://img.freepik.com/free-photo/fun-3d-cartoon-casual-character_183364-80985.jpg?t=st=1742045922~exp=1742049522~hmac=5ec79c8364f996a580f0bf197464e77096fca2553bf5e5128fcbd77295bc13c2&w=900)] pt-2 w-full flex justify-between flex-col '>
        <img className='w-20 ml-6 ' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className=' text-3xl font-bold '>Get Started with Uber</h2>
            <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
