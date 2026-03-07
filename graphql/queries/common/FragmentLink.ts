import { gql } from '@apollo/client';

export const FRAGMENT_LINK = gql`
    fragment link on Link {
        source
        custom
        mail
        target
        label

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
