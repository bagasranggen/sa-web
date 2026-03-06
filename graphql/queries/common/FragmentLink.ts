import { gql } from '@apollo/client';

export const FRAGMENT_LINK = gql`
    fragment link on Link {
        source
        custom
        mail
        target
        label

        category {
            url
            title
        }

        product {
            url
            title
        }

        page {
            url
            title
        }
    }
`;
