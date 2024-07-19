import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname;

    const isAuth = await getToken({ req });
    const isLoginPath = pathName.startsWith('/login');

    const sensitiveRoutes = ['/home'];

    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathName.startsWith(route)
    );

    if (isLoginPath) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/home', req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathName === '/') {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/login', '/home/:path*'],
};
