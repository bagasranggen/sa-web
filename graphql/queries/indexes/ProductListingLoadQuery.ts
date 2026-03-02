import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';

export const PRODUCT_LISTING_LOAD_QUERY = gql`
    query ProductListingQuery($categoryId: JSON, $colorId: [JSON], $limit: Int, $page: Int) {
        Products(
            limit: $limit
            page: $page
            where: { AND: [{ category: { equals: $categoryId } }, { colors: { in: $colorId } }] }
        ) {
            docs {
                ...productBase
                ...productFilters
            }

            loadMore: hasNextPage
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
`;
