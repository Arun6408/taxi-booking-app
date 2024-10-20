import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.div 
     className='w-screen md:w-[80%] flex mx-2 md:mx-auto mt-5 pr-4 px-6 border shadow-md rounded-full border-gray-100'
     initial={{ opacity: 0, scale: 0.8, y:-15 }}
     animate={{ opacity: 1, scale: 1 ,y:0}}
     transition={{ duration: 0.3 }}
     >
        <motion.div 
         className='flex justify-between flex-grow mr-4'
         initial={{ opacity: 0, x:-20 }}
         animate={{ opacity: 1, x:0 }}
         transition={{ duration: 0.5 ,delay : 0.25}}
         >
            <Image width={120} height={60} className='drop-shadow-2xl' src={'/logo.png'} alt={'logo'}/>
            <div className='hidden md:flex gap-6 items-center mx-2'>
                <h2 className='hover:bg-gray-50 cursor-pointer transition-all  rounded-lg px-4 py-2'>Home</h2>
                <h2 className='hover:bg-gray-50 cursor-pointer transition-all  rounded-lg px-4 py-2'>History</h2>
                <h2 className='hover:bg-gray-50 cursor-pointer transition-all  rounded-lg px-4 py-2'>Help</h2>
            </div>
        </motion.div>
      <UserButton afterSignOutUrl="/"/>
    </motion.div>
  )
}

export default Navbar