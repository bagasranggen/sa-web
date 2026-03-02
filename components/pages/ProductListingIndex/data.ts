import { PRODUCTS_FILTERS, PRODUCTS_SORT } from '@/libs/mock';
import { Color, PageDataParamsProps, PageDataProps, Product } from '@/libs/@types';
import { createPicsumImage, createProductPrice } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { CATEGORY_ENTRY_QUERY, PRODUCT_LISTING_INDEX_QUERY } from '@/graphql';

import { ProductListingIndexProps } from '@/components/pages/ProductListingIndex';
import { ThumbnailItemProps } from '@/components/common/Cards';
import { ProductListingFilterProps } from '@/components/pages/ProductListingIndex/ProductListingFilter';

export const ProductListingData = async ({
    typeHandle,
    uri,
    slug,
}: PageDataParamsProps): Promise<PageDataProps<ProductListingIndexProps>> => {
    const { data: categoryData } = await apolloClient().query({
        query: CATEGORY_ENTRY_QUERY,
        variables: { slug },
    });

    const categoryId = (categoryData as any)?.Categories?.docs?.[0]?.id;

    const { data } = await apolloClient().query({
        query: PRODUCT_LISTING_INDEX_QUERY,
        variables: { uri, categoryId },
    });

    const category = (data as any)?.ProductsCategories?.docs?.[0];
    const products = (data as any)?.Products?.docs;

    const listing: ProductListingIndexProps['entries']['listing'] = [];

    // const tmpColorSet = new Set();
    const tmpColorSet = new Set();
    const tmpColorMap = new Map();
    let tmpColor = [];

    if (products && products.length > 0) {
        products.forEach((item: Product, i: number) => {
            if (!item?.url) return;

            const colors: ThumbnailItemProps['colors'] = [];
            if (item?.colors && item.colors.length > 0) {
                item.colors.forEach((itm: NonNullable<Product['colors']>[number]) => {
                    if (typeof itm !== 'number' && itm?.color) {
                        colors.push(itm.color);
                        tmpColorSet.add({ value: itm.slug, label: itm.title });

                        if (!tmpColorMap.has(itm.slug)) {
                            tmpColorMap.set(itm.slug, item.title);
                        }

                        tmpColorMap.set(itm.slug, itm.title);
                        tmpColor.push({ value: itm.slug, label: itm.title });
                    }
                });
            }

            listing.push({
                link: { href: item.url },
                media: [
                    createPicsumImage({ id: 151 + i, width: 600, height: 800, media: 768 }),
                    createPicsumImage({ id: 151 + i, width: 600, height: 450 }),
                ],
                colors,
                price: createProductPrice(item?.prices?.[0]),
                children: item.title,
            });
        });
    }

    if (tmpColor.length > 0) {
        console.log({ test: [...new Map(tmpColor.map((item) => [item.slug, item])).values()] });
    }

    console.log({
        tmpColorSet,
        tmpColorMap,
        tmpColor,
        test: tmpColorSet.has({ value: 'black', label: 'Black' }),
        test2: tmpColorSet.has('black'),
    });

    // const tmpColorSet = new Set();

    // const tmpColor: NonNullable<ProductListingFilterProps['filters']>[number]['checkbox'] = Array.from(new Set());
    // const tmpColor: NonNullable<ProductListingFilterProps['filters']>[number]['checkbox'] = {
    // handle: 'color',
    // children: 'Color',
    // checkbox: [],
    // };

    const filters: ProductListingIndexProps['entries']['filters'] = {
        sort: PRODUCTS_SORT,
        filters: PRODUCTS_FILTERS,
    };

    return {
        typeHandle,
        entries: {
            banner: category?.title ?? 'Collection',
            listing,
            filters,
        },
    };
};
