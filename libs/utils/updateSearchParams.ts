export type UpdateSearchParamsProps = Partial<Record<'set' | 'remove', { key: string; value: string }[]>>;

export const updateSearchParams = (props?: UpdateSearchParamsProps) => {
    const location = window.location;

    let url = '';
    if (location?.origin) url += location.origin;
    if (location?.pathname) url += location.pathname;

    try {
        const searchParams = new URL(location.href).searchParams;

        if (props?.set && props.set.length > 0) {
            props.set.forEach(({ key, value }) => {
                searchParams.set(key, value);
            });
        }

        if (props?.remove && props.remove.length > 0) {
            props.remove.forEach(({ key, value }) => {
                searchParams.delete(key, value);
            });
        }

        if (searchParams.size > 0) url += `?${searchParams.toString()}`;
    } catch {}

    return url;
};
