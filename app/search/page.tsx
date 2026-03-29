import React from 'react';

import { PageProps } from '@/libs/@types';

import SearchIndex from '@/components/pages/SearchIndex';

const Page = async ({}: PageProps): Promise<React.ReactElement> => {
    return <SearchIndex />;
};

export default Page;
