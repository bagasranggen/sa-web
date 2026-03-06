import { gql } from '@apollo/client';

import { FRAGMENT_NAVIGATION } from '@/graphql/queries/global/fragments/FragmentNavigation';
import { FRAGMENT_FOOTER } from '@/graphql/queries/global/fragments/FragmentFooter';

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
    }

    ${FRAGMENT_NAVIGATION}
    ${FRAGMENT_FOOTER}
`;
