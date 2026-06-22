import { gql } from '@apollo/client';

export const FRAGMENT_PRODUCT_DETAIL = gql`
    fragment productDetail on Product {
        summaries {
            title {
                slug
                title
            }

            details {
                label {
                    slug
                    title
                }

                value
            }
        }
    }
`;
