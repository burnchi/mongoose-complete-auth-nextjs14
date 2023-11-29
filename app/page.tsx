"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/logout')
  }

  return (
    <div className='h-screen w-screen flex'>
      <div className='m-auto flex flex-col items-center justify-center'>
        <p className='text-right text-xl font-medium'>username:<span className=' col-span-3'>xiaoming</span></p>
        <p className='text-right text-xl font-medium'>email:<span className=' col-span-3'>123</span></p>
        <button className=' text-center p-2 bg-blue-600 text-white mt-2'
          onClick={handleClick}
        >logout</button>
      </div>
    </div>
  )
}
