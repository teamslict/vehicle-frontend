//
// Server-side image download proxy - bypasses CORS issues
//

import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
    try {
        const { images, stockNumber } = await request.json();

        if (!images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json({ error: 'No images provided' }, { status: 400 });
        }

        const zip = new JSZip();

        const results = await Promise.allSettled(
            images.map(async (url: string, index: number) => {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const arrayBuffer = await response.arrayBuffer();
                const extension = url.split('.').pop()?.split(/[?#]/)[0] || 'jpg';
                const filename = `vehicle-${stockNumber || 'image'}-${index + 1}.${extension}`;
                zip.file(filename, arrayBuffer);
                return filename;
            })
        );

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        if (successCount === 0) {
            return NextResponse.json({ error: 'Failed to download any images' }, { status: 500 });
        }

        const zipBlob = await zip.generateAsync({ type: 'arraybuffer' });

        return new NextResponse(zipBlob, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${stockNumber || 'vehicle'}-pictures.zip"`,
            },
        });
    } catch (error) {
        console.error('Download proxy error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
