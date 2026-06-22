import { s3Client } from '@/libs/fetchers/s3Client';

import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export type GetS3SignedUrlProps = {
    volumeAsset: string;
    filename: string;
};

export const getS3SignedUrl = async ({ volumeAsset, filename }: GetS3SignedUrlProps) => {
    let data = undefined;

    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET || '',
        Key: `${volumeAsset}/${filename}`,
    });

    try {
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

        if (signedUrl) data = signedUrl;
    } catch {}

    return data;
};
