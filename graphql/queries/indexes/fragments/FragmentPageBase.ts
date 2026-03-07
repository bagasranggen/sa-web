import { gql } from '@apollo/client';

export const FRAGMENT_PAGE_BASE = gql`
    fragment pageBase on Page {
        typeHandle
        title
        url
        uri
    }
`;
