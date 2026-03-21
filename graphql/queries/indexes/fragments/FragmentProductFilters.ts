import { gql } from '@apollo/client';

import { FRAGMENT_CATEGORY } from '@/graphql/queries/common/FragmentCategory';
import { FRAGMENT_SIZE } from '@/graphql/queries/common/FragmentSize';
import { FRAGMENT_COLOR } from '@/graphql/queries/common/FragmentColor';

export const FRAGMENT_PRODUCT_FILTERS = gql`
    fragment productFilters on Product {
        category {
            ...category
        }

        sizes {
            ...size
        }

        colors {
            ...color
        }
    }

    ${FRAGMENT_CATEGORY}
    ${FRAGMENT_SIZE}
    ${FRAGMENT_COLOR}
`;
