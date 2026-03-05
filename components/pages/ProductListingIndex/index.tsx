'use client';

import React, { Suspense, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PRODUCT_LOAD_LIMIT } from '@/libs/constants';
import { Product } from '@/libs/@types';
import { IntersectionEvents, ParamsEvents } from '@/libs/hooks';
import { convertObjectToSearchParamsQuery, convertSearchParamsToObject } from '@/libs/utils';
import { createProductItem } from '@/libs/factory';

import { useLazyQuery } from '@apollo/client/react';
import { OperationVariables } from '@apollo/client';
import { FILTERS_ID_QUERY, PRODUCT_LISTING_LOAD_QUERY } from '@/graphql';

import Container from '@/components/common/Container';
import Heading, { BaseProps } from '@/components/common/Heading';
import Cards, { ThumbnailProps } from '@/components/common/Cards';
import Loader from '@/components/common/Loader';
import ProductListingFilter, {
    ProductListingFilterProps,
} from '@/components/pages/ProductListingIndex/ProductListingFilter';
import ProductListingNotFound, {
    ProductListingNotFoundProps,
} from '@/components/pages/ProductListingIndex/ProductListingNotFound';
import ProductListingWrapper from '@/components/pages/ProductListingIndex/ProductListingWrapper';

export type ProductListingIndexProps = {
    entries: {
        category?: { id?: number };
        otherRecommendations?: ProductListingNotFoundProps['links'];
        banner: BaseProps['children'];
        listing: ThumbnailProps['items'];
        filters: Pick<ProductListingFilterProps, 'sort' | 'filters'>;
    };
};

const ProductListingIndex = ({ entries }: ProductListingIndexProps): React.ReactElement => {
    const router = useRouter();
    const pathname = usePathname();

    const [loadProducts, { loading }] = useLazyQuery(PRODUCT_LISTING_LOAD_QUERY, {});
    const [getFilterId] = useLazyQuery(FILTERS_ID_QUERY);

    const loadMoreRef = useRef(null);

    const [filter, setFilter] = useState<ProductListingFilterProps['activeFilter']>({});
    const [listingItems, setListingItems] = useState<ThumbnailProps['items']>(entries.listing);
    const [loadMoreIsLoading, setLoadMoreIsLoading] = useState(false);
    const [paginationPage, setPaginationPage] = useState(1);
    const [hasLoadMore, setHasLoadMore] = useState<boolean>(entries?.listing?.length > 0);

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

    const productsFilterHandler = ({
        page,
        filterVars,
        searchParams,
    }: {
        page: number;
        filterVars?: OperationVariables;
        searchParams?: ProductListingFilterProps['activeFilter'];
    }) => {
        let isMultipleLoad = false;
        if (page - paginationPage > 1) isMultipleLoad = true;
        if (page > 1 && Object.keys(filterVars ?? {}).length > 0) isMultipleLoad = true;

        let productsVariable = {};

        if (entries?.category?.id) {
            productsVariable = Object.assign(productsVariable, { categoryId: entries.category.id });
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
                .then(() => {
                    setLoadMoreIsLoading(false);

                    if (page && page > 0) setPaginationPage(page);
                    if (searchParams) setFilter((prevState) => ({ ...prevState, ...searchParams }));
                });
        });
    };

    const listingIsEmpty = entries?.listing?.length === 0;
    const listingFilterIsEmpty = filterIsActive && listingItems && listingItems.length === 0;

    let notFound: Pick<ProductListingNotFoundProps, 'links' | 'children' | 'subtitle'> = {};

    if (listingIsEmpty) {
        let tmp: Pick<ProductListingNotFoundProps, 'links' | 'children' | 'subtitle'> = {
            children: "We're preparing this style. It will be available shortly",
        };

        if (entries?.otherRecommendations && entries.otherRecommendations.length > 0) {
            tmp = Object.assign(tmp, {
                subtitle: 'In the meantime, browse our other styles',
                links: entries.otherRecommendations,
            });
        }

        notFound = Object.assign(notFound, tmp);
    }

    if (listingFilterIsEmpty) {
        notFound = Object.assign(notFound, {
            children: "We couldn't find styles that fit your selection",
            subtitle: 'Try adjusting or clearing some filters to see more styles',
        });
    }

    return (
        <>
            <Suspense fallback={null}>
                <IntersectionEvents
                    ref={loadMoreRef}
                    onIntersection={() => {
                        if (!loading && !loadMoreIsLoading && hasLoadMore) {
                            pageLoadHandler({ page: paginationPage + 1, scroll: false });
                        }
                    }}
                />

                <ParamsEvents
                    onChange={({ params }) => {
                        const { page, ...rest } = params;
                        const paramsPage = page ? Number(page) : 1;

                        const { params: searchParams, paramsArr, paramsLength } = convertSearchParamsToObject(rest);

                        if (paramsLength === 0) {
                            setFilter({});
                            if (entries.listing.length > 0) setHasLoadMore(true);
                        }

                        if (paramsLength === 0 && paramsPage === 1) setListingItems(entries.listing);

                        if (paramsPage === 1) setPaginationPage(1);

                        if (paramsLength > 0 || paramsPage > 1) {
                            let variablesCategory = searchParams;

                            if (paramsArr && paramsLength > 0) {
                                paramsArr.forEach(([key]) => {
                                    variablesCategory = Object.assign(variablesCategory, {
                                        [`${key}Filter`]: true,
                                    });
                                });
                            }

                            productsFilterHandler({
                                filterVars: variablesCategory,
                                page: paramsPage,
                                searchParams,
                            });
                        }
                    }}
                />
            </Suspense>

            {entries?.banner && (
                <Container className="mt-8">
                    <Heading
                        as="h1"
                        variant="page">
                        {entries.banner}
                    </Heading>
                </Container>
            )}

            <Container className="mt-4 mb-15">
                {entries.filters && (entries.filters?.sort || entries.filters?.filters) && (
                    <ProductListingFilter
                        className="mb-2"
                        activeFilter={filter}
                        sort={entries.filters.sort}
                        filters={entries.filters.filters}
                        onOpenChange={(open, form) => {
                            if (!open) {
                                const searchQuery = convertObjectToSearchParamsQuery({
                                    obj: form,
                                    removeParams: ['page'],
                                });

                                let path = pathname;
                                if (searchQuery) path += searchQuery;

                                router.push(path);
                            }
                        }}
                        reset={{
                            active: filterIsActive,
                            onResetFilters: () => {
                                router.push(pathname);
                            },
                        }}
                    />
                )}

                {listingItems && listingItems.length > 0 && (
                    <ProductListingWrapper isLoading={!loadMoreIsLoading && loading}>
                        <Cards.Thumbnail items={listingItems} />
                    </ProductListingWrapper>
                )}

                <ProductListingNotFound
                    className="mt-12"
                    show={listingIsEmpty || listingFilterIsEmpty}
                    subtitle={notFound?.subtitle}
                    links={notFound?.links}>
                    {notFound?.children}
                </ProductListingNotFound>

                {loadMoreIsLoading && <Loader className="flex flex-col items-center mt-12 mb-3">Loading</Loader>}

                <div
                    ref={loadMoreRef}
                    id="loadMore"
                />
            </Container>
        </>
    );
};

export default ProductListingIndex;
