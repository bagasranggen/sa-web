import { gql } from '@apollo/client';

export const FRAGMENT_SIZE = gql`
    fragment size on Size {
        id
        slug
    }
`;
