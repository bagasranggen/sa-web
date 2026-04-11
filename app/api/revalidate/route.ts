import { NextResponse, NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');
    const type: 'layout' | 'page' | undefined = (searchParams?.get('type') as 'layout' | 'page') ?? undefined;

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET_TOKEN) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Check for path to confirm this is a valid request
    if (typeof path !== 'string') {
        return NextResponse.json({ message: 'Missing path!' }, { status: 401 });
    }

    try {
        revalidatePath(path, type);
        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            path,
        });
    } catch {
        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'Missing path to revalidate',
        });
    }
}
