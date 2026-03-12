import { MARQUEE_HOMEPAGE } from '@/libs/mock';
import { Homepage, PageDataParamsProps, PageDataProps } from '@/libs/@types';
import { createPicsumImage } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { HOMEPAGE_INDEX_QUERY } from '@/graphql';

import { HomepageIndexProps } from '@/components/pages/HomepageIndex';

export const HomepageData = async ({ typeHandle }: PageDataParamsProps): Promise<PageDataProps<HomepageIndexProps>> => {
    const { data } = await apolloClient().query({
        query: HOMEPAGE_INDEX_QUERY,
    });

    const d: Homepage = (data as any)?.Homepage;

    let banner: HomepageIndexProps['entries']['banner'] = { media: MARQUEE_HOMEPAGE };

    if (d?.bannerTitle) banner = Object.assign(banner, { children: d.bannerTitle });
    if (d?.bannerSubTitle) banner = Object.assign(banner, { description: d.bannerSubTitle });

    const highlight: HomepageIndexProps['entries']['highlight'] = [];

    if (d?.highlights && d.highlights.length > 0) {
        d.highlights.forEach((item, i) => {
            if (typeof item === 'number') return;
            if (!item?.url) return;

            highlight.push({
                link: {
                    href: item.url,
                    children: 'Detail',
                },
                label: 'New Release',
                media: [
                    createPicsumImage({ id: 239 + i, width: 600, height: 800, media: 768 }),
                    createPicsumImage({ id: 239 + i, width: 600, height: 450 }),
                ],
                // description: parse(description),
                children: item.title,
            });
        });
    }

    let collection: HomepageIndexProps['entries']['collection'] = {};

    if (d?.collectionTitle) collection = Object.assign(collection, { title: d.collectionTitle });

    if (d?.collections && d.collections.length > 0) {
        const tmp: NonNullable<HomepageIndexProps['entries']['collection']>['items'] = [];

        d.collections.forEach((item, i) => {
            if (typeof item === 'number') return;
            if (!item?.url) return;

            tmp.push({
                link: {
                    href: item.url,
                    children: item.title,
                },
                media: [createPicsumImage({ id: 151 + i, width: 800, height: 800 })],
            });
        });

        if (tmp.length > 0) collection = Object.assign(collection, { items: tmp });
    }

    return {
        typeHandle,
        entries: {
            banner,
            highlight,
            collection,
        },
    };
};
