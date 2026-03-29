import { Component } from '@/libs/@types';

import Order, { OrderProps } from '@/components/common/Form/Order';
import Search, { SearchProps } from '@/components/common/Form/Search';

export type * from '@/components/common/Form/Order';
export type * from '@/components/common/Form/Search';

type FormComposition = {
    Order: Component<OrderProps>;
    Search: Component<SearchProps>;
};

export default Object.assign<{}, FormComposition>({}, { Order, Search });
