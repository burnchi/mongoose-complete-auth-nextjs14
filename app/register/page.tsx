"use client"
import Link from 'next/link'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
    //submit才执行
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    const authenticate = async (formData: any) => {
        // console.log(formData);
        const dataForm = document.getElementById('dataform') as HTMLFormElement

        try {
            const response = await axios.post('/api/register', formData)
            const data = await response.data
            toast.success(data?.message, {
                position: "top-center"
            })
            router.push('/login')
        } catch (error:any) {
            toast.error(error?.response?.data?.error, {
                position: "top-center"
            })
            dataForm.reset()
        }
        // console.log(response);
        // console.log(data);
            
            
    }

    return (
        <div className='w-screen h-screen flex gap-y-5'>
            <form className='min-w-[40vw] min-h-[45vh] m-auto flex flex-col p-10 gap-y-4 ring-2 ring-blue-400'
                id='dataform'
                onSubmit={handleSubmit(authenticate)}
            >
                <h1 className=' text-center text-xl font-semibold'>注册界面</h1>
                <div className='flex flex-col'>
                    <label htmlFor="username">用户名</label>
                    <input className='ring-2 ring-blue-200 p-2 focus:outline-blue-500' type="text" id="username"
                        {
                        ...register("username", {
                            required: "用户名不能为空!"
                        })
                        }
                        placeholder='xiaoming' autoComplete="off" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">电子邮件</label>
                    <input className='ring-2 ring-blue-200 p-2 focus:outline-blue-500' type="text" id="email"
                        {
                        ...register("email", {
                            required: "电子邮件不能为空!",
                            pattern: {
                                value: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm,
                                message: '电子邮件格式错误！'
                            },
                        })
                        }
                        placeholder='111' autoComplete="off" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">密码</label>
                    <input id="password" className='ring-2 ring-blue-200 p-2 focus:outline-blue-500' type="password"
                        {...register("password", {
                            required: "密码不能为空!",
                            minLength: {
                                value: 4,
                                message: "密码至少4位"
                            }
                        })}
                        placeholder='111' autoComplete="off" />
                </div>
                <button type='submit' className='p-2 bg-blue-500 text-white'
                >注册</button>
                <div>
                    <p>{errors.username?.message}</p>
                    <p>{errors.email?.message}</p>
                    <p>{errors.password?.message}</p>
                </div>

                <p className=' text-center my-auto'>
                    {`已经有账号了？`}
                    <Link href='/login' className=' text-blue-400 font-medium text-[1.1em]'>登录</Link>
                </p>
            </form>
        </div>
    )
}
