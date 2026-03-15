import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';
import { FRAGMENT_PAGE_BASE } from '@/graphql/queries/indexes/fragments/FragmentPageBase';
import { FRAGMENT_PRODUCT_MEDIA_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductMediaBase';

export const PRODUCT_LISTING_INDEX_QUERY = gql`
    query ProductListingIndexQuery($uri: String, $typeHandle: [Page_typeHandle_Input], $categoryId: JSON, $limit: Int) {
        Pages(where: { uri: { equals: $uri } }) {
            docs {
                ...pageBase
            }
        }

        OtherPages: Pages(
            limit: 3
            where: { AND: [{ uri: { not_equals: $uri } }, { typeHandle: { in: $typeHandle } }] }
        ) {
            docs {
                ...pageBase
            }
        }

        Products(limit: $limit, where: { category: { equals: $categoryId } }) {
            docs {
                ...productBase
                ...productFilters
                ...productMediaBase
            }

            loadMore: hasNextPage
        }

        ProductsFilters: Products(where: { category: { equals: $categoryId } }) {
            docs {
                ...productFilters
            }
        }
    }

    ${FRAGMENT_PAGE_BASE}
    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
    ${FRAGMENT_PRODUCT_MEDIA_BASE}
`;
