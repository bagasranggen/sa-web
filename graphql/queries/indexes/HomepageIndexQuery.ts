import { gql } from '@apollo/client';

import { FRAGMENT_PRODUCT_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductBase';
import { FRAGMENT_PAGE_BASE } from '@/graphql/queries/indexes/fragments/FragmentPageBase';
import { FRAGMENT_PRODUCT_MEDIA_BASE } from '@/graphql/queries/indexes/fragments/FragmentProductMediaBase';
import { FRAGMENT_PRODUCT_DESCRIPTION } from '@/graphql/queries/indexes/fragments/FragmentProductDescription';
import { FRAGMENT_PRODUCT_MEDIA_MARQUEE } from '@/graphql/queries/indexes/fragments/FragmentProductMediaMarquee';

export const HOMEPAGE_INDEX_QUERY = gql`
    query HomepageIndexQuery {
        Homepage {
            typeHandle

            bannerTitle
            bannerSubTitle

            bannerMedia {
                ...productBase
                ...productMediaMarquee
            }

            highlights {
                ...productBase
                ...productDescription
                ...productMediaBase
            }

            collectionTitle

            collections {
                ...pageBase
            }
        }
    }

    ${FRAGMENT_PRODUCT_BASE}
    ${FRAGMENT_PRODUCT_DESCRIPTION}
    ${FRAGMENT_PRODUCT_MEDIA_BASE}
    ${FRAGMENT_PRODUCT_MEDIA_MARQUEE}
    ${FRAGMENT_PAGE_BASE}
`;
