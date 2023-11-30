"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function Home() {
  const router = useRouter()
  // 用户数据用状态定义可以大范围使用
  const [user, setuser] = useState({
    username: "",
    email: ""
  })
  const handleClick = async () => {
    try {
      const response = await axios.get('/api/logout')
      const data = await response.data
      toast.success(data?.message, {
        position: "top-center"
      })
      router.push('/login')

    } catch (error) {
      toast.error(error as string, {
        position: "top-center"
      })
    }
  }

  // 请求用户数据
  const onFetchUser = async () => {
    try {
      const response = await axios.get('/api/profile')
      const data = await response.data
      setuser(data.user)
    } catch (error:any) {
      toast.error(error?.response?.data?.error, {
        position: "top-center",
      })
      router.push('/login')
    }
  }

  useEffect(() => {
    onFetchUser()
  }, [])


  return (
    <div className='h-screen w-screen flex'>
      <div className='m-auto flex flex-col items-center justify-center'>
        <p className='text-right text-xl font-medium'>username:<span className=' col-span-3'>{user?.username}</span></p>
        <p className='text-right text-xl font-medium'>email:<span className=' col-span-3'>{user?.email}</span></p>
        <button className=' text-center p-2 bg-blue-600 text-white mt-2'
          onClick={handleClick}
        >logout</button>
      </div>
    </div>
  )
}
