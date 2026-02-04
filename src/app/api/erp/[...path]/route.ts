import { NextRequest, NextResponse } from 'next/server';

const ERP_API_URL = process.env.ERP_API_URL || 'http://localhost:3000';

const ERP_API_KEY = process.env.ERP_API_KEY;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const apiPath = path.join('/');
    const { searchParams } = new URL(request.url);

    const url = `${ERP_API_URL}/api/public/export/${apiPath}?${searchParams}`;

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': request.headers.get('Authorization') || (ERP_API_KEY ? `Bearer ${ERP_API_KEY}` : ''),
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();

            // Debug: If upstream returns error, append target URL info
            if (!res.ok && data.error) {
                data.error = `${data.error} (Target: ${url})`;
            }

            return NextResponse.json(data, { status: res.status });
        } else {
            const text = await res.text();
            console.error('ERP API Error: Non-JSON response', text.slice(0, 200));
            return NextResponse.json(
                { error: 'Backend returned non-JSON response. Is the backend running?' },
                { status: res.status === 200 ? 502 : res.status }
            );
        }
    } catch (error) {
        console.error('ERP API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch from ERP' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const apiPath = path.join('/');
    const body = await request.json();

    const url = `${ERP_API_URL}/api/public/export/${apiPath}`;

    try {
        console.log(`Proxying POST to: ${url}`);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': request.headers.get('Authorization') || (ERP_API_KEY ? `Bearer ${ERP_API_KEY}` : ''),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log(`Upstream response: ${res.status} ${res.statusText}`);
        const text = await res.text();
        try {
            const data = JSON.parse(text);
            return NextResponse.json(data, { status: res.status });
        } catch (e) {
            console.error("Non-JSON Response from ERP:", text.slice(0, 500));
            return NextResponse.json({ error: "Upstream returned non-JSON", body: text.slice(0, 200) }, { status: 502 });
        }
    } catch (error) {
        console.error('ERP API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch from ERP' }, { status: 500 });
    }
}
