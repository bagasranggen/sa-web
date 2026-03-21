import { gql } from '@apollo/client';

export const FRAGMENT_PRODUCT_DESCRIPTION = gql`
    fragment productDescription on Product {
        shortDescription
    }
`;
