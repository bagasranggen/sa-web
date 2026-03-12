import { gql } from '@apollo/client';

import { FRAGMENT_NAVIGATION } from '@/graphql/queries/global/fragments/FragmentNavigation';
import { FRAGMENT_FOOTER } from '@/graphql/queries/global/fragments/FragmentFooter';
import { FRAGMENT_GLOBAL_LOCATION } from '@/graphql/queries/common/fragmentGlobalLocation';

export const GLOBAL_QUERY = gql`
    query GlobalQuery {
        Navigation {
            navigations {
                ...navigation
            }
        }

        Footer {
            ...footer
        }

        Global {
            ...globalLocation
        }
    }

    ${FRAGMENT_NAVIGATION}
    ${FRAGMENT_FOOTER}
    ${FRAGMENT_GLOBAL_LOCATION}
`;
