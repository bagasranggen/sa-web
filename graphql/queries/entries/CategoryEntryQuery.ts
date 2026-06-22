import { gql } from '@apollo/client';
import { FRAGMENT_CATEGORY } from '@/graphql/queries/common/FragmentCategory';

export const CATEGORY_ENTRY_QUERY = gql`
    query CategoryEntryQuery($slug: String) {
        Categories(where: { slug: { equals: $slug } }) {
            docs {
                ...category
            }
        }
    }

    ${FRAGMENT_CATEGORY}
`;
