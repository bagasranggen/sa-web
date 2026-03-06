import { Navigation } from '@/libs/@types';
import { createLinkItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { GLOBAL_QUERY } from '@/graphql';

import { HeaderProps } from '@/components/layout/Header';

export const LayoutData = async () => {
    let data: any | undefined = undefined;

    try {
        const { data: d } = await apolloClient().query({
            query: GLOBAL_QUERY,
        });

        if (d) data = d;
    } catch {}

    const headerNavigation = data?.Navigation?.navigations;

    const header: HeaderProps['items'] = [];

    if (headerNavigation && headerNavigation.length > 0) {
        headerNavigation.forEach((item: NonNullable<Navigation['navigations']>[number]) => {
            let tmp: NonNullable<HeaderProps['items']>[number] | undefined = undefined;

            const { linkIsValid, link } = createLinkItem(item?.link);

            if (!linkIsValid) return;

            if (link) tmp = Object.assign(tmp ?? {}, { link: link });

            if (item?.children && item.children.length > 0) {
                const tmpChild: NonNullable<HeaderProps['items']>[number]['child'] = [];

                item.children.forEach(
                    (child: NonNullable<NonNullable<Navigation['navigations']>[number]['children']>[number]) => {
                        const { linkIsValid, link } = createLinkItem(child?.link);

                        if (!linkIsValid) return;

                        if (link) tmpChild.push({ link });
                    }
                );

                if (tmpChild.length > 0) tmp = Object.assign(tmp ?? {}, { child: tmpChild } as any);
            }

            if (tmp) header.push(tmp);
        });
    }

    return {
        header,
    };
};
