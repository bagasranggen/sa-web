import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PAGE_BASE } from '@/graphql/queries/indexes/fragments/FragmentPageBase';

export const HOMEPAGE_INDEX_QUERY = gql`
    query HomepageIndexQuery {
        Homepage {
            typeHandle

            bannerTitle
            bannerSubTitle

            highlights {
                ...productBase
            }

            collectionTitle

            collections {
                ...pageBase
            }
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PAGE_BASE}
`;
