'use client';

import React, { Suspense, useState } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { ParamsEvents, useListing } from '@/libs/hooks';

import Animation from '@/components/common/Animation';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Listing from '@/components/features/Listing';

export type SearchIndexProps = {};

const SearchIndex = ({}: SearchIndexProps): React.ReactElement => {
    const {
        listingItems,
        hasLoadMore,
        loadMoreIsLoading,
        loadProductsLoading,
        filterIsLoading,
        paginationPage,
        productsFilterHandler,
        pageLoadHandler,
    } = useListing({});

    const [search, setSearch] = useState<string | undefined>(undefined);

    let containerProductClass: ArrayStringProps = ['mt-4 mb-15'];
    if (listingItems.length === 0 && loadProductsLoading) containerProductClass.push('min-h-20');
    containerProductClass = joinArrayString(containerProductClass);

    return (
        <>
            <Suspense fallback={null}>
                <ParamsEvents
                    onChange={({ params }) => {
                        const { page, q } = params;
                        const paramsPage = page ? Number(page) : 1;

                        if (q) {
                            productsFilterHandler({
                                page: paramsPage,
                                searchVars: { searchTitle: q },
                            });
                            setSearch(params.q);
                        }
                    }}
                />
            </Suspense>

            <Animation
                type="fade-in"
                id="fadeBanner">
                <Container className="mt-8">
                    <Heading
                        as="h1"
                        variant="page">
                        Search Result: {search}
                    </Heading>
                </Container>
            </Animation>

            <Container className={containerProductClass}>
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
                    message={{
                        notFoundTitle: "We couldn't find styles that fit your needs",
                    }}
                />
            </Container>
        </>
    );
};

export default SearchIndex;
