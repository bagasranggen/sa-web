import { gql } from '@apollo/client';

import { FRAGMENT_LINK } from '@/graphql/queries/common/FragmentLink';
import { FRAGMENT_FOOTER_LOCATION } from '@/graphql/queries/common/FragmentFooterLocation';

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

        ...footerLocation
    }

    ${FRAGMENT_LINK}
    ${FRAGMENT_FOOTER_LOCATION}
`;
