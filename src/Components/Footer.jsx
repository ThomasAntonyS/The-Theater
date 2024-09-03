import React from 'react'

const Footer = () => {
  return (
    <div className='Footer_Main relative h-[60vh] w-[100vw] '>
        <p className=' absolute text-3xl h-max w-max font-mono font-bold text-white mx-20 mt-[20px]'>THE THEATER</p>

        <div className="Contact_and_Quick_Link flex absolute w-[90vw] h-[65%] top-1/2 left-1/2 border-2 transform -translate-x-1/2 -translate-y-1/2">
          <section className="Quick_Link w-1/2 h-full border">

          </section>

          <section className="Contact w-1/2 h-full text-white">
          </section>
        </div>

        <center>
            <p className=' absolute bottom-0 mb-2 text-white'><span className=' mx-2'>&copy;</span>The Theater - All Rights Reserved, 2024</p>
        </center>
    </div>
  )
}

export default Footer