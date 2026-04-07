import { gql } from '@apollo/client';

export const PAGES_ENTRY_QUERY = gql`
    query PagesEntryQuery(
        $limit: Int
        $uri: String
        $pagesTypeHandle: Page_typeHandle_Input
        $productsTypeHandle: Product_typeHandle_Input
        $productsCategory: JSON
    ) {
        Products(
            limit: $limit
            where: {
                AND: [
                    { uri: { equals: $uri } }
                    { typeHandle: { equals: $productsTypeHandle } }
                    { category: { equals: $productsCategory } }
                ]
            }
        ) {
            docs {
                typeHandle
                uri
            }
        }

        Pages(
            limit: $limit
            where: { AND: [{ uri: { equals: $uri } }, { typeHandle: { equals: $pagesTypeHandle } }] }
        ) {
            docs {
                typeHandle
                uri
            }
        }
    }
`;
