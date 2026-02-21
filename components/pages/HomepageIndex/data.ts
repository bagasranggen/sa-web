import { BANNER_HOMEPAGE, CARDS_HIGHLIGHT, CARDS_MEDIA } from '@/libs/mock';
import { PageDataProps } from '@/libs/@types';

import { HomepageIndexProps } from '@/components/pages/HomepageIndex';

export const HomepageData = async (): Promise<PageDataProps<HomepageIndexProps>> => {
    const banner: HomepageIndexProps['entries']['banner'] = BANNER_HOMEPAGE;

    const highlight: HomepageIndexProps['entries']['highlight'] = CARDS_HIGHLIGHT;

    const collection: HomepageIndexProps['entries']['collection'] = CARDS_MEDIA;

    return {
        entries: {
            banner,
            highlight,
            collection,
        },
    };
};
