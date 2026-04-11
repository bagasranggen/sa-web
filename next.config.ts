import type { NextConfig } from 'next';

const REMOTE_HOSTNAMES = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME
    ? process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME.split(',')
    : [];

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: REMOTE_HOSTNAMES.map((item: string) => ({ hostname: item })),
        localPatterns: [{ pathname: '/api/media/*' }],
    },
};

export default nextConfig;
