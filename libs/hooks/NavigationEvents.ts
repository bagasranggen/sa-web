'use client';

import { useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';

export type NavigationEventsUrlProps = {
    pathname?: string | null;
    searchParams?: ReadonlyURLSearchParams | null;
    href?: string;
};

export type NavigationEventsProps = Partial<
    Record<'startHandler' | 'endHandler', (url?: NavigationEventsUrlProps) => void>
>;

export const NavigationEvents = ({ startHandler, endHandler }: NavigationEventsProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => {
            // console.log('start');
            if (startHandler) startHandler({ pathname, searchParams });
        };
        const handleStop = () => {
            // console.log('end');
            if (endHandler) endHandler({ pathname, searchParams });
        };

        handleStop();

        return () => {
            handleStart();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    return null;
};
