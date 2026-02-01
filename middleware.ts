import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let hostname = req.headers.get("host") || 'localhost:3000';

    // Remove port if present
    hostname = hostname.split(':')[0];

    // Define domains that do path-based routing (no rewrite needed)
    // e.g. localhost, vercel.app
    // On these domains, users access tenants via /subdomain (e.g. localhost:3000/slict)
    // On custom domains, users access root (e.g. alphamc.pro/) which rewrites to /alphamc.pro/

    const isLocalhost = hostname.includes('localhost') || hostname === '127.0.0.1';
    const isVercel = hostname.includes('.vercel.app');

    if (isLocalhost || isVercel) {
        return NextResponse.next();
    }

    // CUSTOM DOMAIN LOGIC
    // Rewrite: alphamc.pro/vehicles -> /alphamc.pro/vehicles
    // The page param [storeSlug] will receive "alphamc.pro"
    // The backend API must look up the tenant by `domain: "alphamc.pro"`

    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
        }`;

    // console.log(`Rewriting custom domain ${hostname} to /${hostname}${path}`);

    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
