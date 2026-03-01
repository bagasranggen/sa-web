import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from './joinArrayString';

export const getUriFromParams = (uri: ArrayStringProps) => {
    const data: ArrayStringProps = [];

    if (uri && Array.isArray(uri)) data.push(...uri);
    if (uri && !Array.isArray(uri)) data.push(uri);

    return {
        uri: joinArrayString(data, '/'),
        slug: data.pop(),
    };
};
