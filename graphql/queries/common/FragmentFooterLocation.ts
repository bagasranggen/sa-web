import { gql } from '@apollo/client';

import { FRAGMENT_LINK } from '@/graphql/queries/common/FragmentLink';

export const FRAGMENT_FOOTER_LOCATION = gql`
    fragment footerLocation on Footer {
        locationTitle
        locationAddress
        locationLink {
            ...link
        }
    }

    ${FRAGMENT_LINK}
`;
