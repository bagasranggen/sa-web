import React, { Suspense, useRef } from 'react';

import {
    PRODUCT_MESSAGE_EMPTY_SUBTITLE,
    PRODUCT_MESSAGE_EMPTY_TITLE,
    PRODUCT_MESSAGE_FILTER_EMPTY_SUBTITLE,
    PRODUCT_MESSAGE_FILTER_EMPTY_TITLE,
} from '@/libs/constants';

import Cards, { ThumbnailProps } from '@/components/common/Cards';
import Animation from '@/components/common/Animation';
import Loader from '@/components/common/Loader';
import ListingWrapper, { ListingWrapperProps } from '@/components/features/Listing/ListingWrapper';
import ListingEmpty, { ListingEmptyProps } from '@/components/features/Listing/ListingEmpty';
import { IntersectionEvents, IntersectionEventsProps, useListing } from '@/libs/hooks';
import ListingFilter, { ListingFilterProps } from '@/components/features/Listing/ListingFilter';

export type ListingProps = {
    filters?: {
        isActive: boolean;
        reset?: Pick<NonNullable<ListingFilterProps['reset']>, 'onResetFilters'>;
    } & Pick<ListingFilterProps, 'sort' | 'filters' | 'onOpenChange' | 'activeFilter'>;
    loadMore?: Pick<IntersectionEventsProps, 'onIntersection'>;
    message?: Partial<Record<'notFoundTitle' | 'notFoundFilterTitle', ListingEmptyProps['children']>> &
        Partial<Record<'notFoundSubtitle' | 'notFoundFilterSubtitle', ListingEmptyProps['subtitle']>>;
    recommendations?: ListingEmptyProps['links'];
    isLoading?: {
        filter?: ListingWrapperProps['isLoading'];
        loadMore?: boolean;
    };
} & Pick<ThumbnailProps, 'items'>;

const Listing = ({
    items,
    filters,
    message,
    loadMore,
    isLoading,
    recommendations,
}: ListingProps): React.ReactElement => {
    const loadMoreRef = useRef(null);

    const hasFilters = !!(
        (filters?.sort && filters.sort.length > 0) ||
        (filters?.filters && filters.filters.length > 0)
    );

    // console.log(isLoading);

    const listingIsEmpty = !isLoading?.filter && items?.length === 0;
    const listingFilterIsEmpty = filters?.isActive && items && items.length === 0;

    let notFound: Pick<ListingEmptyProps, 'links' | 'children' | 'subtitle'> = {};

    if (listingIsEmpty && message?.notFoundTitle) {
        let tmp: Pick<ListingEmptyProps, 'links' | 'children' | 'subtitle'> = {
            children: message?.notFoundTitle,
        };

        if (message?.notFoundSubtitle) {
            tmp = Object.assign(tmp, { subtitle: message.notFoundSubtitle });
        }

        if (recommendations && recommendations.length > 0) {
            tmp = Object.assign(tmp, { links: recommendations });
        }

        notFound = Object.assign(notFound, tmp);
    }

    if (listingFilterIsEmpty) {
        notFound = Object.assign(notFound, {
            children: PRODUCT_MESSAGE_FILTER_EMPTY_TITLE,
            subtitle: PRODUCT_MESSAGE_FILTER_EMPTY_SUBTITLE,
        });
    }

    return (
        <>
            <Suspense fallback={null}>
                <IntersectionEvents
                    ref={loadMoreRef}
                    onIntersection={loadMore?.onIntersection}
                />
            </Suspense>

            {hasFilters && (
                <Animation
                    type="fade-in"
                    id="fadeFilter"
                    config={{ delay: 'fadeBanner' }}>
                    <div>
                        <ListingFilter
                            className="mb-2"
                            activeFilter={filters?.activeFilter}
                            sort={filters.sort}
                            filters={filters.filters}
                            onOpenChange={(open, form) => {
                                if (filters?.onOpenChange) filters.onOpenChange(open, form);
                            }}
                            reset={{
                                active: filters?.isActive,
                                onResetFilters: filters?.reset?.onResetFilters,
                            }}
                        />
                    </div>
                </Animation>
            )}

            {(isLoading?.filter || (items && items.length > 0)) && (
                <ListingWrapper isLoading={isLoading?.filter}>
                    <Cards.Thumbnail
                        items={items}
                        animation={{
                            type: 'fade-in',
                            config: {
                                delay: hasFilters ? 'fadeFilter' : 'fadeBanner',
                            },
                            trigger: filters?.isActive,
                        }}
                    />
                </ListingWrapper>
            )}

            {(!isLoading?.filter || !isLoading?.loadMore) && (listingIsEmpty || listingFilterIsEmpty) && (
                <Animation
                    type="fade-in"
                    config={{ delay: hasFilters ? 'fadeFilter' : 'fadeBanner' }}>
                    <div>
                        <ListingEmpty
                            className="mt-12"
                            show={listingIsEmpty || listingFilterIsEmpty}
                            subtitle={notFound?.subtitle}
                            links={notFound?.links}>
                            {notFound?.children}
                        </ListingEmpty>
                    </div>
                </Animation>
            )}

            {isLoading?.loadMore && <Loader className="flex flex-col items-center mt-12 mb-3">Loading</Loader>}

            {loadMore?.onIntersection && (
                <div
                    ref={loadMoreRef}
                    id="loadMore"
                />
            )}
        </>
    );
};

export default Listing;
