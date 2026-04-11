import { gql } from '@apollo/client';

export const FRAGMENT_PRODUCT_CALENDAR = gql`
    fragment productCalendar on Product {
        bookedDates {
            from
            to
        }
    }
`;
