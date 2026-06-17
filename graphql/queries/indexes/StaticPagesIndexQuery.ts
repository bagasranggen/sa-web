import { gql } from '@apollo/client';

import { FRAGMENT_PAGE_BASE } from '@/graphql/queries/indexes/fragments/FragmentPageBase';
import { FRAGMENT_META } from '@/graphql/queries/common/FragmentMeta';
import { FRAGMENT_CONTENT_BLOCKS } from '@/graphql/queries/common/contentBlocks/FragmentContentBlocks';

export const STATIC_PAGES_INDEX_QUERY = gql`
    query StaticPagesQuery($uri: String) {
        Pages(where: { uri: { equals: $uri } }) {
            docs {
                ...pageBase

                meta {
                    ...meta
                }

                contentBlocks {
                    ...contentBlocks
                }
            }
        }
    }

    ${FRAGMENT_PAGE_BASE}
    ${FRAGMENT_META}
    ${FRAGMENT_CONTENT_BLOCKS}
`;
