import { PageDataParamsProps, PageDataProps, Product } from '@/libs/@types';
import { shuffleObjectArray } from '@/libs/utils';
import { createProductDetailItem, createProductItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { PRODUCT_DETAIL_INDEX_QUERY, PRODUCT_LISTING_LOAD_QUERY } from '@/graphql';

import { ProductDetailIndexProps } from '@/components/pages/ProductDetailIndex';

export const ProductDetailData = async ({
    typeHandle,
    uri,
}: PageDataParamsProps): Promise<PageDataProps<ProductDetailIndexProps>> => {
    const { data } = await apolloClient().query({
        query: PRODUCT_DETAIL_INDEX_QUERY,
        variables: { uri },
    });

    const d: Product = (data as any)?.Products?.docs?.[0];

    let banner: ProductDetailIndexProps['entries']['banner'] = undefined;

    if (d?.title) {
        const detail = createProductDetailItem({ item: d });

        banner = Object.assign(banner ?? {}, {
            info: detail?.info,
            carousel: detail?.carousel,
            price: detail?.price,
            calendar: detail?.calendar,
            sizeGuides: detail?.sizeGuides,
            button: {
                href: `/order?collection=${detail?.slug}`,
            },
            children: detail?.children,
        });
    }

    const recommendation: ProductDetailIndexProps['entries']['recommendation'] = [];

    let otherVariables = { limit: 8 };
    if (d?.slug) {
        otherVariables = Object.assign(otherVariables, { notSlug: d.slug });
    }
    // if (typeof d?.category !== 'number' && d?.category?.id) {
    //     otherVariables = Object.assign(otherVariables, { categoryId: d.category.id });
    // }

    const { data: otherData } = await apolloClient().query({
        query: PRODUCT_LISTING_LOAD_QUERY,
        variables: otherVariables,
    });

    const otherProducts = shuffleObjectArray({ items: (otherData as any)?.Products?.docs, limit: 4 });

    if (otherProducts.length > 0) {
        otherProducts.forEach((item) => {
            const product = createProductItem({ item: item as any, withColors: false });

            if (product) recommendation.push(product);
        });
    }

    return {
        typeHandle,
        entries: {
            banner,
            recommendation,
        },
    };
};
