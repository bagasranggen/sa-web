import { gql } from '@apollo/client';

import { FRAGMENT_MEDIA } from '@/graphql/queries/common/FragmentMedia';

export const FRAGMENT_PAGE_PRODUCT = gql`
    fragment pageProduct on Page {
        productMedia {
            ...productMedia
        }
    }

    ${FRAGMENT_MEDIA({
        on: 'Media',
        name: 'productMedia',
        sizesHandles: ['assets800x800'],
    })}
`;
