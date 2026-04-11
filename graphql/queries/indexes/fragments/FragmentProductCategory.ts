import { gql } from '@apollo/client';

import { FRAGMENT_CATEGORY } from '@/graphql/queries/common/FragmentCategory';

export const FRAGMENT_PRODUCT_CATEGORY = gql`
    fragment productCategory on ProductsCategory {
        title
        url
        uri

        category {
            ...category
        }
    }

    ${FRAGMENT_CATEGORY}
`;
