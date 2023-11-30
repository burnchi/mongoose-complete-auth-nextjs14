import { connectDB } from "@/dbConfig/db"
import { userModel } from "@/models/UserModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDB()
// 处理浏览器传来的POST请求
export const POST = async (request: NextRequest) => {
    try {
        // 得到POST请求体内容 await别忘了
        const { email, password } = await request.json()
        
        // 数据库查找用户
        const existUser = await userModel.findOne({ email })
        // 没有用户则返回
        if (!existUser) {
            return NextResponse.json({
                error: "电子邮件或密码错误!",
                success: false,
            },{status:401})
        }
        // 有用户，则比较数据库密码
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            return NextResponse.json({
                error: "电子邮件或密码错误!",
                success: false,
            },{status:401})
        }
        //1天过期
        const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        })
        //返回浏览器json对象
        const response =  NextResponse.json({
            message: "登录成功!",
            success: true,
            token
        }, { status: 200 })
        
        // 设置cookie
        response.cookies.set(
            "token",token,{
                httpOnly:true
            }
        )
        return response

    } catch (error) {
        return NextResponse.json({
            error: error,
            success: false,
        }, { status: 500 })
    }

}