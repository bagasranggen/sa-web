import { Component } from '@/libs/@types';

import Detail, { DetailProps } from '@/components/common/Banner/Detail';
import Homepage, { HomepageProps } from '@/components/common/Banner/Homepage';

export type * from '@/components/common/Banner/Detail';
export type * from '@/components/common/Banner/Homepage';

type BannerComposition = {
    Detail: Component<DetailProps>;
    Homepage: Component<HomepageProps>;
};

export default Object.assign<{}, BannerComposition>({}, { Detail, Homepage });
