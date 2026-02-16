'use client';

import React, { Suspense, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PRODUCT_LISTING_LOAD } from '@/libs/mock';
import { IntersectionEvents, ParamsEvents } from '@/libs/hooks';
import { convertObjectToSearchParamsQuery } from '@/libs/utils';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Cards, { ThumbnailProps } from '@/components/common/Cards';
import Loader from '@/components/common/Loader';
import ProductListingFilter, {
    ProductListingFilterProps,
} from '@/components/pages/ProductListingIndex/ProductListingFilter';

export type ProductListingIndexProps = {
    entries: {
        listing: ThumbnailProps['items'];
        filters: Pick<ProductListingFilterProps, 'sort' | 'filters'>;
    };
};

const ProductListingIndex = ({ entries }: ProductListingIndexProps): React.ReactElement => {
    const [filter, setFilter] = useState<ProductListingFilterProps['activeFilter']>({});

    const router = useRouter();
    const pathname = usePathname();

    const loadMoreRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [listingLoadItems, setListingLoadItems] = useState<ThumbnailProps['items']>([]);

    const resetFilterIsActive = useMemo(() => {
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

    const listingItems = useMemo(() => {
        const data = [];

        const initialListing = entries.listing;

        if (initialListing && initialListing.length > 0) data.push(...initialListing);
        if (listingLoadItems && listingLoadItems.length > 0 && page > 0) data.push(...listingLoadItems);

        return data;
    }, [entries.listing, listingLoadItems, page]);

    const pageLoadHandler = ({ page, scroll = false }: { page: number; scroll?: boolean }) => {
        setIsLoading(true);

        const searchQuery = convertObjectToSearchParamsQuery({ obj: { page: page } });

        let path = pathname;
        if (page > 0 && searchQuery) path += searchQuery;

        router.push(path, { scroll });
    };

    return (
        <>
            <Suspense fallback={null}>
                <IntersectionEvents
                    ref={loadMoreRef}
                    onIntersection={() => {
                        if (!isLoading) {
                            pageLoadHandler({ page: page + 1, scroll: false });
                        }
                    }}
                />

                {/* TODO: change items fetching with real data later on */}
                <ParamsEvents
                    onChange={({ params }) => {
                        const { page, ...rest } = params;

                        const paramsPage = page ? Number(page) : undefined;

                        if (paramsPage && paramsPage > 0) {
                            setPage(paramsPage);

                            setTimeout(() => {
                                setIsLoading(false);
                                setListingLoadItems((prev) => [...prev, ...PRODUCT_LISTING_LOAD]);
                            }, 1000);
                        }

                        if (!paramsPage) {
                            setPage(0);

                            setTimeout(() => {
                                setIsLoading(false);
                                setListingLoadItems([]);
                            }, 1000);
                        }

                        const restArr = Object.entries(rest);

                        if (restArr.length > 0) {
                            let tmp = {};

                            restArr.forEach(([key, value]) => {
                                tmp = Object.assign(tmp, {
                                    [key]: value.split(','),
                                });
                            });

                            setFilter((prevState) => ({ ...prevState, ...tmp }));
                        }
                    }}
                />
            </Suspense>

            <Container className="mt-8">
                <Heading
                    as="h1"
                    variant="page">
                    Formal
                </Heading>
            </Container>

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
                            active: resetFilterIsActive,
                            onResetFilters: () => {
                                router.push(pathname);
                                setFilter({});
                            },
                        }}
                    />
                )}

                {listingItems && listingItems.length > 0 && (
                    <>
                        <Cards.Thumbnail items={listingItems} />

                        {isLoading && <Loader className="flex flex-col items-center mt-12 mb-3">Loading</Loader>}

                        <div ref={loadMoreRef} />
                    </>
                )}
            </Container>
        </>
    );
};

export default ProductListingIndex;
