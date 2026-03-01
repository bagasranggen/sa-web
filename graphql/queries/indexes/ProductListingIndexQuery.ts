import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';

export const PRODUCT_LISTING_INDEX_QUERY = gql`
    query ProductListingIndexQuery($uri: String, $categoryId: JSON) {
        ProductsCategories(where: { uri: { equals: $uri } }) {
            docs {
                title
            }
        }

        Products(where: { category: { equals: $categoryId } }) {
            docs {
                ...productBase
                ...productFilters
            }
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
`;
