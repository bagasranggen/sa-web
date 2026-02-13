import React from 'react';

import Banner, { HomepageProps } from '@/components/common/Banner';

export type HomepageIndexProps = {
    entries: {
        banner: Pick<HomepageProps, 'children' | 'media' | 'description'>;
    };
};

const HomepageIndex = ({ entries }: HomepageIndexProps): React.ReactElement => {
    return <>{entries?.banner && <Banner.Homepage {...entries.banner} />}</>;
};

export default HomepageIndex;
