import { gql } from '@apollo/client';

export const PAGES_ENTRY_QUERY = gql`
    query PagesEntryQuery(
        $limit: Int
        $uri: String
        $pagesTypeInclude: Boolean! = true
        $pagesTypeHandle: Page_typeHandle_Input
        $productsTypeInclude: Boolean! = true
        $productsTypeHandle: Product_typeHandle_Input
        $productsCategory: [JSON]
    ) {
        Products(
            limit: $limit
            where: {
                AND: [
                    { uri: { equals: $uri } }
                    { typeHandle: { equals: $productsTypeHandle } }
                    { category: { in: $productsCategory } }
                ]
            }
        ) @include(if: $productsTypeInclude) {
            docs {
                typeHandle
                uri
            }
        }

        Pages(limit: $limit, where: { AND: [{ uri: { equals: $uri } }, { typeHandle: { equals: $pagesTypeHandle } }] })
            @include(if: $pagesTypeInclude) {
            docs {
                typeHandle
                uri
            }
        }
    }
`;
