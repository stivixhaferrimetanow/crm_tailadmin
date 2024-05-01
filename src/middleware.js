import { getUserFromToken } from '@/lib/utils';
import { NextResponse, NextRequest } from 'next/server';


export async function middleware(req) {
    try {
        const cookie = req.cookies.get('token');

        const token = cookie?.value;
        const user = await getUserFromToken(token);

        if (user) {
            req.cookies.set('user', user);
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: '/authed/:path*',
};




