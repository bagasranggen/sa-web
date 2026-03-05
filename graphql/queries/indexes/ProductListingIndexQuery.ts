import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PRODUCT_FILTERS } from '@/graphql/queries/indexes/fragments/FragmentProductFilters';
import { FRAGMENT_PRODUCT_CATEGORY } from '@/graphql/queries/indexes/fragments/FragmentProductCategory';

export const PRODUCT_LISTING_INDEX_QUERY = gql`
    query ProductListingIndexQuery($uri: String, $categoryId: JSON, $limit: Int) {
        ProductsCategories(where: { uri: { equals: $uri } }) {
            docs {
                ...productCategory
            }
        }

        OtherProductsCategories: ProductsCategories(limit: 3, where: { uri: { not_equals: $uri } }) {
            docs {
                ...productCategory
            }
        }

        Products(limit: $limit, where: { category: { equals: $categoryId } }) {
            docs {
                ...productBase
                ...productFilters
            }
        }

        ProductsFilters: Products(where: { category: { equals: $categoryId } }) {
            docs {
                ...productFilters
            }
        }
    }

    ${FRAGMENT_PRODUCT_CATEGORY}
    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_FILTERS}
`;
