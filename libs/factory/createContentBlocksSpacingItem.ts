import { checkStringIsNumber } from '@/libs/utils/checkStringIsNumber';
import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type CreateContentBlocksSpacingItemProps = {
    string?: string | null;
    handle?: string;
    limit?: number;
};

export const createContentBlocksSpacingItem = ({ string, handle, limit = 5 }: CreateContentBlocksSpacingItemProps) => {
    let data = undefined;

    if (string && handle) {
        let tmp: ArrayStringProps = [];

        let value: string | number = string.replace('_', '');
        if (checkStringIsNumber(value)) value = parseInt(value);

        // console.log({ value, type: typeof value });

        if (typeof value === 'number') {
            if (value > limit) {
                tmp.push(`${handle}-${limit}`);
                tmp.push(`md:${handle}-${value}`);
            }

            if (value <= limit) {
                tmp.push(`${handle}-${value}`);
            }
        }

        tmp = joinArrayString(tmp);

        if (tmp) data = tmp;
        // if (typeof value === 'number' && value > limit) {
        //     tmp.push(`${handle}-${limit}`);
        //     tmp.push(`md:${handle}-${value}`);
        // }
        //
        // if (typeof value === 'number' && value < limit) {
        //     tmp.push(`${handle}-${value}`);
        // }
    }

    return data;
};
