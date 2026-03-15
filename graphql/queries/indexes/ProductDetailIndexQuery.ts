import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';
import { FRAGMENT_PRODUCT_DETAIL } from '@/graphql/queries/indexes/fragments/FragmentProductDetail';
import { FRAGMENT_PRODUCT_MEDIA_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductMediaBase';
import { FRAGMENT_PRODUCT_MEDIA_DETAIL } from '@/graphql/queries/indexes/fragments/FragmentProductMediaDetail';

export const PRODUCT_DETAIL_INDEX_QUERY = gql`
    query ProductDetailIndexQuery($uri: String) {
        Products(where: { uri: { equals: $uri } }) {
            docs {
                ...productBase
                ...productFilters
                ...productDetail
                ...productMediaBase
                ...productMediaDetail
            }
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
    ${FRAGMENT_PRODUCT_DETAIL}
    ${FRAGMENT_PRODUCT_MEDIA_BASE}
    ${FRAGMENT_PRODUCT_MEDIA_DETAIL}
`;
