import { gql } from '@apollo/client';

export const FRAGMENT_CATEGORY = gql`
    fragment category on Category {
        id
        slug
        title
    }
`;
