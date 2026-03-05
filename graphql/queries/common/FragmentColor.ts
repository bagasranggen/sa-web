import { gql } from '@apollo/client';

export const FRAGMENT_COLOR = gql`
    fragment color on Color {
        id
        slug
        title
        color
    }
`;
