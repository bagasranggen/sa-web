import { gql } from '@apollo/client';

import { FRAGMENT_COLOR } from '@/graphql/queries/common/FragmentColor';
import { FRAGMENT_SIZE } from '@/graphql/queries/common/FragmentSize';
import { FRAGMENT_CATEGORY } from '@/graphql/queries/common/FragmentCategory';

export const FILTERS_ID_QUERY = gql`
    query FiltersIdQuery(
        $category: [String]
        $categoryFilter: Boolean! = false
        $color: [String]
        $colorFilter: Boolean! = false
        $size: [String]
        $sizeFilter: Boolean! = false
    ) {
        categoryId: Categories(where: { slug: { in: $category } }) @include(if: $categoryFilter) {
            docs {
                ...category
            }
        }

        colorId: Colors(where: { slug: { in: $color } }) @include(if: $colorFilter) {
            docs {
                ...color
            }
        }

        sizeId: Sizes(where: { slug: { in: $size } }) @include(if: $sizeFilter) {
            docs {
                ...size
            }
        }
    }

    ${FRAGMENT_CATEGORY}
    ${FRAGMENT_COLOR}
    ${FRAGMENT_SIZE}
`;
