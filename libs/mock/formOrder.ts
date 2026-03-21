import { BaseInputSelectProps } from '@/components/common/Input';

export const ORDER_COLLECTION: BaseInputSelectProps['items'] = [
    {
        value: '',
        label: '-- Select Order --',
    },
    {
        value: 'gema',
        label: 'Gema Black - B026',
    },
];

export const DELIVERY_OPTIONS_HANDLE = {
    OJOL: 'ojol',
    PAXEL: 'paxel',
    PICKUP: 'pickup',
};

export const DELIVERY_OPTIONS: BaseInputSelectProps['items'] = [
    {
        value: '',
        label: '-- Select Delivery Option --',
    },
    {
        value: 'ojol',
        label: 'Ojek Online',
    },
    {
        value: 'paxel',
        label: 'Paxel Same/One Day',
    },
    {
        value: 'pickup',
        label: 'Pickup From Studio',
    },
];
