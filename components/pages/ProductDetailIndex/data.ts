import {
    CAROUSEL_MEDIA_LIGHTBOX,
    CAROUSEL_MEDIA_PREVIEW,
    CAROUSEL_MEDIA_THUMB,
    PRODUCT_LISTING_NO_COLORS,
    SIZE_GUIDES_LIGHTBOX,
} from '@/libs/mock';
import { PageDataParamsProps, PageDataProps, Product, Summaries } from '@/libs/@types';
import { convertIntToCurrency } from '@/libs/utils';

import { apolloClient } from '@/libs/fetchers';
import { PRODUCT_DETAIL_INDEX_QUERY } from '@/graphql';

import { ProductDetailIndexProps } from '@/components/pages/ProductDetailIndex';
import { DetailProps, DetailInfoProps } from '@/components/common/Banner';

export const ProductDetailData = async ({
    typeHandle,
    uri,
}: PageDataParamsProps): Promise<PageDataProps<ProductDetailIndexProps>> => {
    const { data } = await apolloClient().query({
        query: PRODUCT_DETAIL_INDEX_QUERY,
        variables: { uri },
    });

    const d = (data as any)?.Products?.docs?.[0];

    let banner: ProductDetailIndexProps['entries']['banner'] = undefined;

    if (d?.title) {
        const info: DetailProps['info'] = [];
        if (d?.summaries && d.summaries.length > 0) {
            d.summaries.forEach((item: NonNullable<Summaries>[number]) => {
                const tmp: DetailInfoProps['list'] = [];

                if (item && item?.details && item.details.length > 0) {
                    item.details.forEach((itm: NonNullable<NonNullable<Summaries>[number]['details']>[number]) => {
                        if (!itm?.value) return;
                        if (!itm?.label || typeof itm.label === 'number' || !itm?.label?.title) return;

                        tmp.push({
                            label: itm.label.title,
                            value: itm.value,
                        });
                    });
                }

                if (tmp.length === 0 && !item?.title) return;

                info.push({
                    title: item.title,
                    list: tmp,
                });
            });
        }

        let price: DetailProps['price'] = undefined;
        if (d?.prices?.[0]) {
            const priceItem = d.prices[0];

            price = `${convertIntToCurrency(priceItem?.salePrice ?? priceItem.price, true)}/${priceItem.days}day(s)`;
        }

        let calendar: DetailProps['calendar'] = undefined;
        if (d?.bookedDates && d.bookedDates.length > 0) {
            const tmp: any = [];

            d.bookedDates.forEach((item: NonNullable<Product['bookedDates']>[number]) => {
                if (item?.from && item?.to) tmp.push({ from: new Date(item.from), to: new Date(item.to) });
                if (item?.from && !item?.to) tmp.push(new Date(item.from));
            });

            if (tmp.length > 0) calendar = Object.assign(calendar ?? {}, { disabled: tmp });
        }

        banner = Object.assign(banner ?? {}, {
            info,
            carousel: {
                thumbnail: CAROUSEL_MEDIA_THUMB,
                media: CAROUSEL_MEDIA_PREVIEW,
                lightbox: CAROUSEL_MEDIA_LIGHTBOX,
            },
            price,
            calendar,
            sizeGuides: SIZE_GUIDES_LIGHTBOX,
            button: {
                href: `/order?collection=${d?.slug}`,
            },
            children: d.title,
        });
    }

    const recommendation: ProductDetailIndexProps['entries']['recommendation'] = PRODUCT_LISTING_NO_COLORS;

    return {
        typeHandle,
        entries: {
            banner,
            recommendation,
        },
    };
};
