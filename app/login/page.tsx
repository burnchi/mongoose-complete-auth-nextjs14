"use client"
import Link from 'next/link'
import { useFormState } from 'react-dom'

const authenticate = (prevState:any,formData:any) => {
  const {email,password} = Object.fromEntries(formData)
  console.log({email,password});
  
}


export default function Home() {
  const [state, formAction] = useFormState(authenticate, undefined)
  return (
    <div className='w-screen h-screen flex gap-y-5'>
      <form className='min-w-[40vw] min-h-[45vh] m-auto flex flex-col p-10 gap-y-4 ring-2 ring-blue-400' >
        <h1 className=' text-center text-xl font-semibold'>登录界面</h1>
        <div className='flex flex-col'>
          <label htmlFor="email">电子邮件</label>
          <input className='ring-2 ring-blue-200 p-2 focus:outline-blue-500' type="text" id="email" name='email' placeholder='111' autoComplete="off" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password">密码</label>
          <input id="password" className='ring-2 ring-blue-200 p-2 focus:outline-blue-500' type="password" name='password' placeholder='111' autoComplete="off" />
        </div>
        <button type='submit' className='p-2 bg-blue-500 text-white' 
        formAction={formAction}
        >登录</button>
        <p className=' text-center my-auto'>
          {`还没有注册？`}
          <Link href='/register' className=' text-blue-400 font-medium text-[1.1em]'>注册</Link>
        </p>
      </form>
    </div>
  )
}
