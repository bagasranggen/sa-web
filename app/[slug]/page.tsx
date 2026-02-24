import React from 'react';

import StaticPageIndex from '@/components/pages/StaticPageIndex';
import { StaticPageData } from '@/components/pages/StaticPageIndex/data';

const Page = async ({}): Promise<React.ReactElement> => {
    const { entries } = await StaticPageData();

    return <StaticPageIndex entries={entries} />;
};

export default Page;
