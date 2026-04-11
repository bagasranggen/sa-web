import { gql } from '@apollo/client';

export const FRAGMENT_CB_LABEL_CONTENT = gql`
    fragment cbLabelContent on CbLabelContent {
        blockType
        heading
        content

        cbSpacing {
            ...cbSpacing
        }
    }
`;
