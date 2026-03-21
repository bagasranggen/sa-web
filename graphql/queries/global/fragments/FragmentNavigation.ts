import { gql } from '@apollo/client';

import { FRAGMENT_LINK } from '@/graphql/queries/common/FragmentLink';

export const FRAGMENT_NAVIGATION = gql`
    fragment navigation on Navigation_Navigations {
        entryStatus
        link {
            ...link
        }
        children {
            link {
                ...link
            }
        }
    }

    ${FRAGMENT_LINK}
`;
