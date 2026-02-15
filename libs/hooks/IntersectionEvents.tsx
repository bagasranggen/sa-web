import { RefObject, useEffect } from 'react';
import { useIntersection } from 'react-use';

export type IntersectionEventsProps = {
    ref: RefObject<null | HTMLElement>;
    onIntersection?: () => void;
    options?: IntersectionObserverInit;
};

export const IntersectionEvents = ({ ref, options, onIntersection }: IntersectionEventsProps) => {
    const intersection = useIntersection(ref as RefObject<HTMLElement>, options ?? {});

    useEffect(() => {
        if (!intersection) return;
        if (!intersection.isIntersecting) return;
        if (!onIntersection) return;

        onIntersection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intersection]);

    return null;
};
