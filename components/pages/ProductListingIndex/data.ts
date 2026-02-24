import { PRODUCT_LISTING, PRODUCTS_FILTERS, PRODUCTS_SORT } from '@/libs/mock';
import { PageDataProps } from '@/libs/@types';

import { ProductListingIndexProps } from '@/components/pages/ProductListingIndex';

export const ProductListingData = async (): Promise<PageDataProps<ProductListingIndexProps>> => {
    const listing: ProductListingIndexProps['entries']['listing'] = PRODUCT_LISTING;

    const filters: ProductListingIndexProps['entries']['filters'] = {
        sort: PRODUCTS_SORT,
        filters: PRODUCTS_FILTERS,
    };

    return {
        entries: {
            banner: 'formal',
            listing,
            filters,
        },
    };
};
