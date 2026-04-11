import { gql } from '@apollo/client';

import { FRAGMENT_LINK } from '@/graphql/queries/common/FragmentLink';

export const FRAGMENT_GLOBAL_LOCATION = gql`
    fragment globalLocation on Global {
        locationTitle
        locationAddress

        locationLink {
            ...link
        }
    }

    ${FRAGMENT_LINK}
`;
