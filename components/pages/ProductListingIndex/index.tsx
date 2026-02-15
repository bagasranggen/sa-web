'use client';

import React, { Suspense, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PRODUCT_LISTING_LOAD } from '@/libs/mock';
import { IntersectionEvents, ParamsEvents } from '@/libs/hooks';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Cards, { ThumbnailProps } from '@/components/common/Cards';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';

export type ProductListingIndexProps = {
    entries: {
        listing: ThumbnailProps['items'];
    };
};

const ProductListingIndex = ({ entries }: ProductListingIndexProps): React.ReactElement => {
    const router = useRouter();
    const pathname = usePathname();

    const loadMoreRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [listingLoadItems, setListingLoadItems] = useState<ThumbnailProps['items']>([]);

    const listingItems = useMemo(() => {
        const data = [];

        const initialListing = entries.listing;

        if (initialListing && initialListing.length > 0) data.push(...initialListing);
        if (listingLoadItems && listingLoadItems.length > 0 && page > 0) data.push(...listingLoadItems);

        return data;
    }, [entries.listing, listingLoadItems, page]);

    const pageLoadHandler = ({ page, scroll = false }: { page: number; scroll?: boolean }) => {
        setIsLoading(true);

        let path = pathname;
        if (page > 0) path += `?page=${page}`;

        router.push(path, { scroll });
    };

    return (
        <>
            <Suspense fallback={null}>
                <IntersectionEvents
                    ref={loadMoreRef}
                    onIntersection={() => pageLoadHandler({ page: page + 1 })}
                />

                {/* TODO: change items fetching with real data later on */}
                <ParamsEvents
                    onChange={({ params }) => {
                        const page = params?.page ? Number(params.page) : undefined;

                        if (page && page > 0) {
                            setPage(page);

                            setTimeout(() => {
                                setIsLoading(false);
                                setListingLoadItems((prev) => [...prev, ...PRODUCT_LISTING_LOAD]);
                            }, 1000);
                        }

                        if (!page) {
                            setPage(0);

                            setTimeout(() => {
                                setIsLoading(false);
                                setListingLoadItems([]);
                            }, 1000);
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
                {/* TODO: add filter here */}
                {/*<div className="mb-2">*/}
                {/*    <Button.Block*/}
                {/*        as="button"*/}
                {/*        color="dark"*/}
                {/*        onClick={() => {*/}
                {/*            pageLoadHandler({ page: 0 });*/}
                {/*        }}>*/}
                {/*        reset*/}
                {/*    </Button.Block>*/}
                {/*</div>*/}

                {listingItems && listingItems.length > 0 && (
                    <>
                        <Cards.Thumbnail items={listingItems} />

                        {isLoading && <Loader className="flex flex-col items-center my-3">Loading</Loader>}

                        <div ref={loadMoreRef} />
                    </>
                )}
            </Container>
        </>
    );
};

export default ProductListingIndex;
