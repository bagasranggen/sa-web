import React from 'react';

import OrderIndex from '@/components/pages/OrderIndex';
import { OrderData } from '@/components/pages/OrderIndex/data';

const Page = async ({}): Promise<React.ReactElement> => {
    const { entries } = await OrderData();

    return <OrderIndex entries={entries} />;
};

export default Page;
