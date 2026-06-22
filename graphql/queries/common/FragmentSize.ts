import { gql } from '@apollo/client';

export const FRAGMENT_SIZE = gql`
    fragment size on Size {
        _order
        id
        title
        slug
    }
`;
