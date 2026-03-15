import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';
import { FRAGMENT_PRODUCT_MEDIA_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductMediaBase';

export const PRODUCT_LISTING_LOAD_QUERY = gql`
    query ProductListingLoadQuery($categoryId: [JSON], $colorId: [JSON], $sizeId: [JSON], $limit: Int, $page: Int) {
        Products(
            limit: $limit
            page: $page
            where: {
                AND: [{ category: { in: $categoryId } }, { colors: { in: $colorId } }, { sizes: { in: $sizeId } }]
            }
        ) {
            docs {
                ...productBase
                ...productFilters
                ...productMediaBase
            }

            page
            loadMore: hasNextPage
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
    ${FRAGMENT_PRODUCT_MEDIA_BASE}
`;
