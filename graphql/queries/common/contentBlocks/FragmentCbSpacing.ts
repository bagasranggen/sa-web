import { gql } from '@apollo/client';

export const FRAGMENT_CB_SPACING = gql`
    fragment cbSpacing on CbSpacing {
        marginTop
        marginBottom
    }
`;
