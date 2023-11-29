import { connectDB } from "@/dbConfig/db"
import { userModel } from "@/models/UserModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt'

connectDB()

// 处理浏览器传来的POST请求
export const POST = async (request: NextRequest) => {
    try {
        // console.log(await request.formData);

        // 得到POST请求体内容 await别忘了
        const { username, email, password } = await request.json()
        console.log({ username, email, password });

        // 数据库查找用户
        const existUser = await userModel.findOne({ email })
        // 有用户则注册不了
        if (existUser) {
            return NextResponse.json({
                error: "用户已存在",
                success: false,
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        })
        // console.log({ user }); 数据的json对象
        //返回浏览器json对象
        return NextResponse.json({
            message: "用户注册成功",
            success: true,
        },{status: 201})
    } catch (error) {

        return NextResponse.json({
            error: error,
            success: false,
        },{status: 500})
    }

}