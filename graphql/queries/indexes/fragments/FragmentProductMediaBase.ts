import { gql } from '@apollo/client';

import { FRAGMENT_MEDIA } from '@/graphql/queries/common/FragmentMedia';

export const FRAGMENT_PRODUCT_MEDIA_BASE = gql`
    fragment productMediaBase on Product {
        media {
            ...productMediaBaseAssets
        }
    }

    ${FRAGMENT_MEDIA({
        on: 'MediaProduct',
        name: 'productMediaBaseAssets',
        sizesHandles: ['assets600x800', 'assets600x400'],
    })}
`;
