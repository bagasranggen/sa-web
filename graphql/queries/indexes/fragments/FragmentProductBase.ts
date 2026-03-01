import { gql } from '@apollo/client';

export const FRAGMENT_PRODUCT_BASE = gql`
    fragment productBase on Product {
        url
        uri
        title
        slug

        tag {
            title
            slug
        }

        prices {
            price
            salePrice
            days
        }
    }
`;
