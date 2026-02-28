import { BaseInputSelectProps } from '@/components/common/Input';
import { OrderProps } from '@/components/common/Form';

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

export const DELIVERY_ADDRESS_PICKUP: OrderProps['pickupAddress'] = {
    title: 'Rockstar Studio',
    href: 'https://maps.app.goo.gl/VqRijoqTWNh5G2Nd7',
    target: '_blank',
    children:
        'Jl. Sendang Sari No.33, Gempol, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281',
};
