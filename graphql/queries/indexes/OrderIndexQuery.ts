import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_FOOTER_LOCATION } from '@/graphql/queries/common/FragmentFooterLocation';

export const ORDER_INDEX_QUERY = gql`
    query OrderIndexQuery($categoryId: [JSON], $colorId: [JSON], $sizeId: [JSON], $limit: Int, $page: Int) {
        Products(
            limit: $limit
            page: $page
            where: {
                AND: [{ category: { in: $categoryId } }, { colors: { in: $colorId } }, { sizes: { in: $sizeId } }]
            }
        ) {
            docs {
                ...productBase
            }
        }

        Footer {
            ...footerLocation
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_FOOTER_LOCATION}
`;
