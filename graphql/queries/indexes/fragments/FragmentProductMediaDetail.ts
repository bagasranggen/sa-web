import { gql } from '@apollo/client';

import { FRAGMENT_MEDIA } from '@/graphql/queries/common/FragmentMedia';

export const FRAGMENT_PRODUCT_MEDIA_DETAIL = gql`
    fragment productMediaDetail on Product {
        media {
            ...productMediaDetailAssets
        }

        mediaSizeGuides {
            ...productMediaSizeGuidesAssets
        }
    }

    ${FRAGMENT_MEDIA({
        on: 'MediaProduct',
        name: 'productMediaDetailAssets',
        sizesHandles: ['assets1000xauto', 'assets1000x1400', 'assets400x560', 'assets300x300'],
    })}

    ${FRAGMENT_MEDIA({
        on: 'MediaProduct',
        name: 'productMediaSizeGuidesAssets',
        sizesHandles: ['assets600x800'],
    })}
`;
