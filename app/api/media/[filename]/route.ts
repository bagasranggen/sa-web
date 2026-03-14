import { getS3SignedUrl } from '@/libs/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const searchParams = req.nextUrl.searchParams;
    const volumeAsset = searchParams?.get('volumeAsset') ?? '';
    const filename = (await params)?.filename;

    const signedUrl = await getS3SignedUrl({
        volumeAsset,
        filename,
    });

    if (!signedUrl) {
        return NextResponse.json({ message: 'Missing url!' });
    }

    const res = await fetch(signedUrl);

    return new Response(res.body, {
        headers: {
            'Content-Type': res.headers.get('content-type')!,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
