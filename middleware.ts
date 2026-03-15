import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // MUSÍ být NextResponse.next() – ne redirect() hned
    // jinak se nezkopírují cookies do response
    const response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    // VŽDY getUser(), nikdy getSession()
    // getUser() ověří token přes Supabase API – nedá se podvrhnout
    // getSession() jen přečte cookies lokálně – nebezpečné pro auth ochranu
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isAuthPage =
        pathname.startsWith('/login') || pathname.startsWith('/register');

    // nepřihlášen + chráněná stránka → na login
    if (!user && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // přihlášen + auth stránka → na hlavní stránku
    if (user && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // DŮLEŽITÉ: vždy vrátit `response`, ne new NextResponse()
    // aby se přenesly refreshnuté cookies
    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
