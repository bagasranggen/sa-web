'use server';

import { convertDMYToMDY } from '@/libs/utils';

import { OrderFormFields } from '@/components/common/Form';

const GOOGLE_APP_URL = process.env.GAS_URL as string;

export const submitOrderForm = async (data: OrderFormFields) => {
    const [startDate, endDate] = data?.date ? data?.date.split(' - ') : [];

    let submitData = {
        name: data?.name,
        instagram: data?.instagram,
        instagramLink: data?.instagram ? `https://www.instagram.com/${data.instagram.replace('@', '')}/` : '',
        contact: data?.contact,
        startDate: convertDMYToMDY(startDate),
        endDate: convertDMYToMDY(endDate),
        order: data?.collection,
        deliveryMethod: data?.deliveryMethod,
        address: data?.address,
        addressPinPoint: data?.addressPinPoint,
    };

    /* Create Order Calendar Event */
    if (data?.date && startDate && endDate) {
        let title = 'Sekar Ayu Booking';
        if (data?.collection) title += ` | ${data.collection}`;

        let options = {};
        if (data?.addressPinPoint) Object.assign(options, { location: data?.addressPinPoint });

        let description = '';
        if (data?.name && data?.contact) description += `Name: ${data?.name} (${data?.contact})\n`;
        if (data?.collection) description += `Order: ${data?.collection}\n`;
        if (description) options = Object.assign(options, { description });

        submitData = Object.assign(submitData, {
            orderCalendar: {
                title,
                startTime: new Date(convertDMYToMDY(startDate)).toISOString(),
                endTime: new Date(convertDMYToMDY(endDate)).toISOString(),
                options,
            },
        });
    }

    try {
        const res = await fetch(GOOGLE_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData),
        });

        if (!res?.ok) {
            throw new Error('Failed to submit order form');
        }

        return {
            status: 'success',
        };
    } catch (e) {
        console.log(e);

        return {
            status: 'error',
            errorMessage: 'An error occurred',
        };
    }
};
