import { Component } from '@/libs/@types';

import Homepage, { HomepageProps } from '@/components/common/Banner/Homepage';

export type * from '@/components/common/Banner/Homepage';

type BannerComposition = {
    Homepage: Component<HomepageProps>;
};

export default Object.assign<{}, BannerComposition>({}, { Homepage });
