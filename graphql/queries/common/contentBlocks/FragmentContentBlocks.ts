import { gql } from '@apollo/client';

import { FRAGMENT_CB_LABEL_CONTENT } from '@/graphql/queries/common/contentBlocks/FragmentCbLabelContent';
import { FRAGMENT_CB_SPACING } from '@/graphql/queries/common/contentBlocks/FragmentCbSpacing';

export const FRAGMENT_CONTENT_BLOCKS = gql`
    fragment contentBlocks on ContentBlocks {
        blocks {
            ...cbLabelContent
        }
    }

    ${FRAGMENT_CB_SPACING}
    ${FRAGMENT_CB_LABEL_CONTENT}
`;
