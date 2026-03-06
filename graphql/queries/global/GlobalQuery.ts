import { gql } from '@apollo/client';
import { FRAGMENT_LINK } from '@/graphql/queries/common/FragmentLink';

export const GLOBAL_QUERY = gql`
    query GlobalQuery {
        Navigation {
            navigations {
                entryStatus

                link {
                    ...link
                }

                children {
                    link {
                        ...link
                    }
                }
            }
        }
    }

    ${FRAGMENT_LINK}
`;
