import { gql } from '@apollo/client';

import { FRAGMENT_LINK } from '@/graphql/queries/common/FragmentLink';

export const FRAGMENT_FOOTER = gql`
    fragment footer on Footer {
        generalInfo {
            entryStatus
            link {
                ...link
            }
        }

        socials {
            entryStatus
            link {
                ...link
            }
        }

        locationTitle
        locationAddress
        locationLink {
            ...link
        }
    }

    ${FRAGMENT_LINK}
`;
