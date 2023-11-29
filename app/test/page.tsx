"use client"
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
    email: string
    password: string
}


export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues:{
            email:"",
            password:""
        }
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(errors);


    console.log(watch("email")) // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {
            ...register("email", {
              required: "电子邮件不能为空"
            })
            } />
            <input {...register("password", {
                required: "密码不能为空",
            })} />
            {/* errors will return when field validation fails  */}
            <input type="submit" />
        </form>
    )
}