import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function handleProxy(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const pathSegments = (await params).path;
    const subPath = pathSegments.join('/');
    const { search } = new URL(request.url);
    
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(_) {
                    // read-only
                }
            }
        }
    );
    
    const { data: { session } } = await supabase.auth.getSession();
    const headers = new Headers(request.headers); // extract headers (specifically Authorization)

    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`);
    }

    // delete 'host' header to avoid domain mismatch
    headers.delete('host');
    const FASTAPI_BACKEND_URL = process.env.FASTAPI_BACKEND_URL;
    const targetUrl = `${FASTAPI_BACKEND_URL}/${subPath}${search}`;

    console.log(targetUrl);
    
    try {
        const hasBody = !['GET', 'HEAD'].includes(request.method);

        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body: hasBody ? await request.blob() : null,
            // @ts-expect-error - unexpected property 'duplex'
            duplex: 'half'
        });

        const data = await response.blob();

        return new NextResponse(data, {
            status: response.status,
            headers: response.headers
        });
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to connect to backend' }, { status: 500 });
    }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;