import { Homepage, PageDataParamsProps, PageDataProps } from '@/libs/@types';
import { createPictureItem, createProductItem } from '@/libs/factory';
import { checkMediaStatus } from '@/libs/utils';

import { apolloClient } from '@/libs/fetchers';
import { HOMEPAGE_INDEX_QUERY } from '@/graphql';

import { HomepageIndexProps } from '@/components/pages/HomepageIndex';

export const HomepageData = async ({ typeHandle }: PageDataParamsProps): Promise<PageDataProps<HomepageIndexProps>> => {
    const { data } = await apolloClient().query({
        query: HOMEPAGE_INDEX_QUERY,
    });

    const d: Homepage = (data as any)?.Homepage;

    let banner: HomepageIndexProps['entries']['banner'] = {};

    if (d?.bannerTitle) banner = Object.assign(banner, { children: d.bannerTitle });
    if (d?.bannerSubTitle) banner = Object.assign(banner, { description: d.bannerSubTitle });

    if (d?.bannerMedia && d.bannerMedia.length > 0) {
        const tmp: NonNullable<HomepageIndexProps['entries']['banner']>['media'] = [];

        d.bannerMedia.forEach((item) => {
            if (typeof item === 'number') return;
            if (typeof item?.media?.[0] === 'number') return;
            if (!item?.url) return;

            const product = createProductItem({ item });
            const { data } = checkMediaStatus({
                item: item?.media?.[0],
                volumeAssets: 'mediaProducts',
                handles: ['assets800x800'],
            });

            if (!product?.link?.href) return;
            if (!data?.['assets800x800']?.src) return;

            tmp.push({
                link: {
                    href: product?.link?.href,
                },
                items: [createPictureItem({ item: data?.['assets800x800'] })],
            });
        });

        if (tmp.length > 0) banner = Object.assign(banner, { media: tmp });
    }

    const highlight: HomepageIndexProps['entries']['highlight'] = [];

    if (d?.highlights && d.highlights.length > 0) {
        d.highlights.forEach((item) => {
            if (typeof item === 'number') return;
            if (!item?.url) return;

            const product = createProductItem({ item });

            if (!product) return;

            highlight.push({
                link: {
                    href: product.link.href,
                    children: 'Detail',
                },
                label: 'New Release',
                media: product?.media,
                description: item?.shortDescription,
                children: product.children,
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
            if (typeof item?.productMedia === 'number' || !item?.productMedia) return;

            const { data } = checkMediaStatus({
                item: item?.productMedia,
                volumeAssets: 'media',
                handles: ['assets800x800'],
            });

            if (!data || !data?.['assets800x800']) return;

            tmp.push({
                link: {
                    href: item.url,
                    children: item.title,
                },
                media: [createPictureItem({ item: data?.['assets800x800'] })],
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
