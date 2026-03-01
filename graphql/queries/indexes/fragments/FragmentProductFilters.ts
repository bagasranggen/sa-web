import { gql } from '@apollo/client';
import { FRAGMENT_CATEGORY } from '@/graphql/queries/common/FragmentCategory';

export const FRAGMENT_PRODUCT_FILTERS = gql`
    fragment productFilters on Product {
        category {
            ...category
        }

        sizes {
            id
            slug
            title
        }

        colors {
            id
            slug
            title
            color
        }
    }

    ${FRAGMENT_CATEGORY}
`;
