'use client';

import React, { Suspense } from 'react';

import { ParamsEvents, useListing } from '@/libs/hooks';
import { convertSearchParamsToObject } from '@/libs/utils';

import Container from '@/components/common/Container';
import Heading, { BaseProps } from '@/components/common/Heading';
import Animation from '@/components/common/Animation';
import Listing, { ListingProps } from '@/components/features/Listing';

export type ProductListingIndexProps = {
    entries: {
        category?: { id?: number };
        products?: { hasLoadMore?: boolean };
        otherRecommendations?: ListingProps['recommendations'];
        banner: BaseProps['children'];
        listing: ListingProps['items'];
        filters: Pick<NonNullable<ListingProps['filters']>, 'sort' | 'filters'>;
    };
};

const ProductListingIndex = ({ entries }: ProductListingIndexProps): React.ReactElement => {
    const {
        filter,
        setFilter,
        filterIsActive,
        filterIsLoading,
        listingItems,
        setListingItems,
        hasLoadMore,
        setHasLoadMore,
        loadProductsLoading,
        loadMoreIsLoading,
        paginationPage,
        setPaginationPage,
        pageLoadHandler,
        productsFilterResetHandler,
        productsFilterCloseHandler,
        productsFilterHandler,
    } = useListing({
        categoryId: entries?.category?.id,
        listing: entries?.listing,
        hasLoadMore: !!entries?.products?.hasLoadMore,
    });

    return (
        <>
            <Suspense fallback={null}>
                <ParamsEvents
                    onChange={({ params }) => {
                        const { page, ...rest } = params;
                        const paramsPage = page ? Number(page) : 1;

                        const { params: searchParams, paramsArr, paramsLength } = convertSearchParamsToObject(rest);

                        if (paramsLength === 0) {
                            setFilter({});
                            if (!!entries?.products?.hasLoadMore) setHasLoadMore(true);
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
                <Animation
                    type="fade-in"
                    id="fadeBanner">
                    <Container className="mt-8">
                        <Heading
                            as="h1"
                            variant="page">
                            {entries.banner}
                        </Heading>
                    </Container>
                </Animation>
            )}

            <Container className="mt-4 mb-15">
                <Listing
                    items={listingItems}
                    isLoading={{
                        filter: !loadMoreIsLoading && (loadProductsLoading || filterIsLoading),
                        loadMore: loadMoreIsLoading,
                    }}
                    loadMore={{
                        onIntersection: () => {
                            if (!loadProductsLoading && !loadMoreIsLoading && hasLoadMore) {
                                pageLoadHandler({ page: paginationPage + 1, scroll: false });
                            }
                        },
                    }}
                    filters={{
                        isActive: filterIsActive,
                        activeFilter: filter,
                        filters: entries?.filters?.filters,
                        sort: entries?.filters?.sort,
                        onOpenChange: (open, form) => {
                            if (!open) productsFilterCloseHandler(form);
                        },
                        reset: {
                            onResetFilters: productsFilterResetHandler,
                        },
                    }}
                    recommendations={entries?.otherRecommendations}
                    message={{
                        notFoundTitle: "We're preparing this style. It will be available shortly",
                        notFoundSubtitle: 'In the meantime, browse our other styles',
                        notFoundFilterTitle: "We couldn't find styles that fit your selection",
                        notFoundFilterSubtitle: 'Try adjusting or clearing some filters to see more styles',
                    }}
                />
            </Container>
        </>
    );
};

export default ProductListingIndex;
