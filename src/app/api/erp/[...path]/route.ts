import { NextRequest, NextResponse } from 'next/server';

const ERP_API_URL = process.env.ERP_API_URL || 'http://localhost:3001';

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
                'Authorization': request.headers.get('Authorization') || '',
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
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
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': request.headers.get('Authorization') || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('ERP API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch from ERP' }, { status: 500 });
    }
}
