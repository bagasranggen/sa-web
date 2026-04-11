import { gql } from '@apollo/client';

import { FRAGMENT_PAGE_BASE } from '@/graphql/queries/indexes/fragments/FragmentPageBase';
import { FRAGMENT_CONTENT_BLOCKS } from '@/graphql/queries/common/contentBlocks/FragmentContentBlocks';

export const STATIC_PAGES_INDEX_QUERY = gql`
    query StaticPagesQuery($uri: String) {
        Pages(where: { uri: { equals: $uri } }) {
            docs {
                ...pageBase

                contentBlocks {
                    ...contentBlocks
                }
            }
        }
    }

    ${FRAGMENT_PAGE_BASE}
    ${FRAGMENT_CONTENT_BLOCKS}
`;
