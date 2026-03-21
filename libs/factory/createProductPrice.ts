import { Prices } from '@/libs/@types';
import { convertIntToCurrency } from '../utils/convertIntToCurrency';
import { joinArrayString } from '../utils/joinArrayString';

export const createProductPrice = (price?: NonNullable<Prices>[number]) => {
    const data = [];

    if (price) {
        data.push(convertIntToCurrency(price?.salePrice ?? price.price, true));
        data.push(`${price.days}day(s)`);
    }

    return data.length > 0 ? joinArrayString(data, '/') : undefined;
};
