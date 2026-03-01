import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';
import { FRAGMENT_PRODUCT_DETAIL } from '@/graphql/queries/indexes/fragments/FragmentProductDetail';

export const PRODUCT_DETAIL_INDEX_QUERY = gql`
    query ProductDetailIndexQuery($uri: String) {
        Products(where: { uri: { equals: $uri } }) {
            docs {
                ...productBase
                ...productFilters
                ...productDetail
            }
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
    ${FRAGMENT_PRODUCT_DETAIL}
`;
