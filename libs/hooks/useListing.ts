import { useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PRODUCT_LOAD_LIMIT } from '@/libs/constants';
import { Product } from '@/libs/@types';
import { createProductItem } from '@/libs/factory';
import { convertObjectToSearchParamsQuery, ConvertObjectToSearchParamsQueryProps } from '@/libs/utils';

import { useLazyQuery } from '@apollo/client/react';
import { FILTERS_ID_QUERY, PRODUCT_LISTING_LOAD_QUERY } from '@/graphql';
import { OperationVariables } from '@apollo/client';

import { ThumbnailProps } from '@/components/common/Cards';
import { ListingFilterProps } from '@/components/features/Listing/ListingFilter';

export type UseListingProps = {
    categoryId?: number;
    listing?: ThumbnailProps['items'];
    hasLoadMore?: boolean;
};

export const useListing = ({ categoryId, listing, hasLoadMore: hasLoadMoreProps }: UseListingProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [loadProducts, { loading: loadProductsLoading }] = useLazyQuery(PRODUCT_LISTING_LOAD_QUERY, {});
    const [getFilterId] = useLazyQuery(FILTERS_ID_QUERY);

    const loadMoreRef = useRef(null);

    const [listingItems, setListingItems] = useState<ThumbnailProps['items']>(listing ?? []);
    const [filter, setFilter] = useState<ListingFilterProps['activeFilter']>({});
    const [paginationPage, setPaginationPage] = useState(1);
    const [hasLoadMore, setHasLoadMore] = useState<boolean>(!!hasLoadMoreProps);
    const [loadMoreIsLoading, setLoadMoreIsLoading] = useState(false);
    const [filterIsLoading, setFilterIsLoading] = useState(false);

    const filterIsActive = useMemo(() => {
        let data = false;

        const filterArr = Object.entries(filter ?? {});
        if (filter && filterArr.length > 0) {
            filterArr.forEach(([key, value]) => {
                if (key === 'sort') return;

                if (value && Array.isArray(value) && value.length > 0) data = true;
            });
        }

        return data;
    }, [filter]);

    const pageLoadHandler = ({ page, scroll = false }: { page: number; scroll?: boolean }) => {
        setLoadMoreIsLoading(true);

        const searchQuery = convertObjectToSearchParamsQuery({ obj: { page: page } });

        let path = pathname;
        if (page > 0 && searchQuery) path += searchQuery;

        router.push(path, { scroll });
    };

    const productsFilterCloseHandler = (obj: ConvertObjectToSearchParamsQueryProps['obj']) => {
        const searchQuery = convertObjectToSearchParamsQuery({
            obj,
            removeParams: ['page'],
        });

        let path = pathname;
        if (searchQuery) path += searchQuery;

        router.push(path);
        if (searchQuery) setFilterIsLoading(true);
    };

    const productsFilterResetHandler = () => {
        router.push(pathname);
    };

    const productsFilterHandler = ({
        page,
        filterVars,
        searchVars,
        searchParams,
    }: {
        page: number;
        filterVars?: OperationVariables;
        searchVars?: object;
        searchParams?: ListingFilterProps['activeFilter'];
    }) => {
        let isMultipleLoad = false;
        if (page - paginationPage >= 1) isMultipleLoad = true;
        if (page > 1 && Object.keys(filterVars ?? {}).length > 0) isMultipleLoad = true;

        let productsVariable = {};

        if (categoryId) {
            productsVariable = Object.assign(productsVariable, { categoryId });
        }
        if (searchVars) {
            productsVariable = Object.assign(productsVariable, searchVars);
        }
        if (!isMultipleLoad) {
            productsVariable = Object.assign(productsVariable, { limit: PRODUCT_LOAD_LIMIT, page });
        }
        if (isMultipleLoad) {
            productsVariable = Object.assign(productsVariable, { limit: PRODUCT_LOAD_LIMIT * page });
        }

        getFilterId({
            variables: filterVars,
        }).then((res) => {
            const resArr = Object.entries(res?.data ?? {});

            resArr.forEach(([key, value]) => {
                productsVariable = Object.assign(productsVariable, {
                    [key]: value.docs?.map((item: any) => item?.id),
                });
            });

            loadProducts({
                variables: productsVariable,
            })
                .then((res) => {
                    const data = (res as any)?.data?.Products;

                    const tmpProducts: ThumbnailProps['items'] = [];
                    if (data?.docs && data.docs.length > 0) {
                        data.docs.forEach((item: Product, i: number) => {
                            const product = createProductItem({ item, index: i });

                            if (product) tmpProducts.push(product);
                        });
                    }

                    setListingItems((prevState) => {
                        if (page === 1 || isMultipleLoad) return tmpProducts;

                        return [...prevState, ...tmpProducts];
                    });

                    setHasLoadMore(data?.loadMore);
                })
                .finally(() => {
                    setLoadMoreIsLoading(false);
                    setFilterIsLoading(false);

                    if (page && page > 0) setPaginationPage(page);
                    if (searchParams) setFilter(searchParams);
                });
        });
    };

    return {
        loadMoreRef,
        filter,
        setFilter,
        filterIsActive,
        listingItems,
        setListingItems,
        hasLoadMore,
        setHasLoadMore,
        loadMoreIsLoading,
        filterIsLoading,
        setFilterIsLoading,
        paginationPage,
        setPaginationPage,
        pageLoadHandler,
        productsFilterResetHandler,
        productsFilterCloseHandler,
        productsFilterHandler,
        loadProductsLoading,
    };
};
