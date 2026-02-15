import { PRODUCT_LISTING } from '@/libs/mock';
import { PageDataProps } from '@/libs/@types';

import { ProductListingIndexProps } from '@/components/pages/ProductListingIndex';

export const ProductListingData = async (): Promise<PageDataProps<ProductListingIndexProps>> => {
    const listing: ProductListingIndexProps['entries']['listing'] = [];

    listing.push(...PRODUCT_LISTING);

    return {
        entries: {
            listing,
        },
    };
};
