import { ORDER_COLLECTION } from '@/libs/mock';
import { PageDataProps } from '@/libs/@types';

import { OrderIndexProps } from '@/components/pages/OrderIndex';

export const OrderData = async (): Promise<PageDataProps<OrderIndexProps>> => {
    return {
        entries: {
            form: {
                collection: ORDER_COLLECTION,
            },
        },
    };
};
