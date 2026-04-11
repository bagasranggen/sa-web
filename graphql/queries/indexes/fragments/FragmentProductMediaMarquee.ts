import { gql } from '@apollo/client';

import { FRAGMENT_MEDIA } from '@/graphql/queries/common/FragmentMedia';

export const FRAGMENT_PRODUCT_MEDIA_MARQUEE = gql`
    fragment productMediaMarquee on Product {
        media {
            ...productMediaMarqueeAssets
        }
    }

    ${FRAGMENT_MEDIA({
        on: 'MediaProduct',
        name: 'productMediaMarqueeAssets',
        sizesHandles: ['assets800x800'],
    })}
`;
