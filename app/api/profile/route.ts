import { connectDB } from "@/dbConfig/db"
import { userModel } from "@/models/UserModel"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

connectDB()
// 处理浏览器传来的POST请求
export const GET = async (request: NextRequest) => {
    try {
        // 获取浏览器传来的token
        const auth = request.cookies.get('token') || ''
        // console.log(auth);
        // {
        //     name: 'token',
        //     value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY4OTkxN2VmZWQyYWNmNGY1MjBjODUiLCJpYXQiOjE3MDEzNTM4NDksImV4cCI6MTcwMTQ0MDI0OX0.dHUyqAiFP_xUIKeo1POzsev3U3TD9cTqC0L78Fk5fSA'
        //   }
        // 没有用户则返回
        if (!auth) {
            return NextResponse.json({
                message: "请先登录!",
                success: false,
            },{status:401})
        }
        // 验证jwt
        const { userId } = await jwt.verify(auth.value,process.env.JWT_SECRET as string) as any
        const existUser = await userModel.findOne({_id:userId}).select("username email")
        // {
        //     _id: new ObjectId('656743ebe775c2a86ac7a9d8'),
        //     username: 'admin',
        //     email: 'admin'
        //   }
        
        if (!existUser) {
            return NextResponse.json({
                message: "用户不存在!",
                success: false,
            },{status:401})
        }
        //返回浏览器查询到的user对象
        return NextResponse.json({
            message: "存在用户!",
            user:existUser,
            success: true,
        }, { status: 200 })
        

    } catch (error) {
        return NextResponse.json({
            error: error,
            success: false,
        }, { status: 500 })
    }

}