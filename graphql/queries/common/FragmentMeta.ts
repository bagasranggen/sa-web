import { gql } from '@apollo/client';

import { BASE_FRAGMENT_MEDIA } from '@/graphql/queries/common/FragmentMedia';

export const FRAGMENT_META = gql`
    fragment meta on Meta {
        title
        description

        image {
            ${BASE_FRAGMENT_MEDIA}
        }
    }
`;
