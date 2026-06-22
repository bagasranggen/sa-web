'use client';

import { useEffect } from 'react';

import ErrorIndex from '@/components/pages/ErrorIndex';

export type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <ErrorIndex
            entries={{
                button: {
                    onClick: reset,
                },
            }}
        />
    );
};

export default ErrorPage;
