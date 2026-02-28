import { Component } from '@/libs/@types';

import Order, { OrderProps } from '@/components/common/Form/Order';

export type * from '@/components/common/Form/Order';

type FormComposition = {
    Order: Component<OrderProps>;
};

export default Object.assign<{}, FormComposition>({}, { Order });
