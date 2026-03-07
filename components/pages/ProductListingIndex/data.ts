import { PRODUCTS_SORT } from '@/libs/mock';
import { PRODUCT_LOAD_LIMIT } from '@/libs/constants';
import { Page, PageDataParamsProps, PageDataProps, Product } from '@/libs/@types';
import { createProductFilter, createProductItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { CATEGORY_ENTRY_QUERY, PRODUCT_LISTING_INDEX_QUERY } from '@/graphql';

import { PAGES_HANDLES } from '@/components/pages/handles';
import { ProductListingIndexProps } from '@/components/pages/ProductListingIndex';

export const ProductListingData = async ({
    typeHandle,
    uri,
    slug,
}: PageDataParamsProps): Promise<PageDataProps<ProductListingIndexProps>> => {
    const isAllProducts = typeHandle === PAGES_HANDLES.PRODUCT_LISTING;

    const { data: categoryData } = await apolloClient().query({
        query: CATEGORY_ENTRY_QUERY,
        variables: { slug },
    });

    const categoryId = (categoryData as any)?.Categories?.docs?.[0]?.id;

    const { data } = await apolloClient().query({
        query: PRODUCT_LISTING_INDEX_QUERY,
        variables: {
            typeHandle: [PAGES_HANDLES.PRODUCT_LISTING, PAGES_HANDLES.PRODUCT_CATEGORIES],
            uri,
            categoryId,
            limit: PRODUCT_LOAD_LIMIT,
        },
    });

    const page = (data as any)?.Pages?.docs?.[0];
    const otherPage = (data as any)?.OtherPages?.docs;
    const products = (data as any)?.Products;
    const productsListing = products.docs;
    const productsFilters = (data as any)?.ProductsFilters?.docs;

    const listing: ProductListingIndexProps['entries']['listing'] = [];

    if (productsListing && productsListing.length > 0) {
        productsListing.forEach((item: Product, i: number) => {
            const product = createProductItem({ item, index: i });

            if (product) listing.push(product);
        });
    }

    const otherRecommendations: ProductListingIndexProps['entries']['otherRecommendations'] = [];

    if (listing.length === 0 && otherPage && otherPage.length > 0) {
        otherPage.forEach((item: Page) => {
            if (!item?.url) return;

            otherRecommendations.push({
                href: item.url,
                children: item.title,
            });
        });
    }

    const tmpCategoryMap = new Map();
    const tmpColorMap = new Map();
    const tmpSizeMap = new Map();

    if (productsFilters && productsFilters.length > 0) {
        productsFilters.forEach((item: Product) => {
            if (item?.category && typeof item.category !== 'number' && isAllProducts) {
                if (!tmpCategoryMap.has(item.category.slug)) {
                    tmpCategoryMap.set(item.category.slug, item.category.title);
                }
            }

            if (item?.sizes && item.sizes.length > 0) {
                item.sizes.forEach((itm: NonNullable<Product['sizes']>[number]) => {
                    if (typeof itm !== 'number') {
                        if (!tmpSizeMap.has(itm.slug)) {
                            tmpSizeMap.set(itm.slug, itm.title);
                        }
                    }
                });
            }

            if (item?.colors && item.colors.length > 0) {
                item.colors.forEach((itm: NonNullable<Product['colors']>[number]) => {
                    if (typeof itm !== 'number' && itm?.color) {
                        if (!tmpColorMap.has(itm.slug)) {
                            tmpColorMap.set(itm.slug, itm.title);
                        }
                    }
                });
            }
        });
    }

    const filterCategories = createProductFilter({
        map: tmpCategoryMap,
        handle: 'category',
        children: 'Category',
    });

    const filterColors = createProductFilter({
        map: tmpColorMap,
        handle: 'color',
        children: 'Color',
    });

    const filterSizes = createProductFilter({
        map: tmpSizeMap,
        handle: 'size',
        children: 'Size',
    });

    const productFilters: NonNullable<ProductListingIndexProps['entries']['filters']>['filters'] = [];

    if (filterCategories) productFilters.push(filterCategories);
    if (filterColors) productFilters.push(filterColors);
    if (filterSizes) productFilters.push(filterSizes);

    const filters: ProductListingIndexProps['entries']['filters'] = {
        sort: PRODUCTS_SORT,
        filters: productFilters,
    };

    return {
        typeHandle,
        entries: {
            category: { id: categoryId },
            products: { hasLoadMore: products?.loadMore },
            otherRecommendations,
            banner: page?.title ?? 'Collection',
            listing,
            filters,
        },
    };
};
