import { NextRequest, NextResponse } from "next/server"

// 处理浏览器传来的POST请求
export const GET = async (request: NextRequest) => {
    try {
        // 设置cookie
        const response =  NextResponse.json({
            message: "退出账号成功!",
            success: true,
        }, { status: 200 })
        response.cookies.delete('token')
        return response
        
    } catch (error) {
        return NextResponse.json({
            error: error,
            success: false,
        }, { status: 500 })
    }

}