import { gql } from '@apollo/client';

export const PAGES_ENTRY_QUERY = gql`
    query PagesEntryQuery($uri: String) {
        Products(where: { uri: { equals: $uri } }) {
            docs {
                typeHandle
            }
        }

        Pages(where: { uri: { equals: $uri } }) {
            docs {
                typeHandle
            }
        }
    }
`;
