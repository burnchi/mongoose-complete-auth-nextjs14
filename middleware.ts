import { NextRequest, NextResponse } from "next/server"

export const middleware = (reqest:NextRequest) => {
    
    const isPublic = reqest.nextUrl.pathname === '/login' || reqest.nextUrl.pathname === '/register'

    const token = reqest.cookies.get('token') || ''

    if (isPublic && token) {
        return NextResponse.redirect(new URL('/',reqest.nextUrl))
    }
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login',reqest.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register'
    ]
}