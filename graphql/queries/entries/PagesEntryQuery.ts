import { gql } from '@apollo/client';

export const PAGES_ENTRY_QUERY = gql`
    query PagesEntryQuery($uri: String) {
        Products(where: { uri: { equals: $uri } }) {
            docs {
                typeHandle
            }
        }

        ProductsCategories(where: { uri: { equals: $uri } }) {
            docs {
                typeHandle
            }
        }

        StaticPages(where: { uri: { equals: $uri } }) {
            docs {
                typeHandle
            }
        }
    }
`;
