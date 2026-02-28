import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export type ParamsEventItemProps = Record<string, string>;

export type ParamsEventsProps = {
    onChange?: ({ params }: { params: ParamsEventItemProps }) => void;
};

export const ParamsEvents = ({ onChange }: ParamsEventsProps): null => {
    const searchParams = useSearchParams();

    const searchParamsToParams = useCallback(() => {
        const params = Object.assign({});

        searchParams?.forEach((value, key) => {
            params[key] = value;
        });

        return params;
    }, [searchParams]);

    useEffect(() => {
        if (!onChange) return;

        onChange({ params: searchParamsToParams() });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, searchParamsToParams]);

    return null;
};
