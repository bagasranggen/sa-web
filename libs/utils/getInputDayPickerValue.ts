import { DateRange } from 'react-day-picker';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils/joinArrayString';

export type GetInputDayPickerValueProps = {
    date?: DateRange | Date;
    mode?: string;
};

export const getInputDayPickerValue = ({ date, mode = 'single' }: GetInputDayPickerValueProps) => {
    let data = undefined;

    if (date && mode === 'range') {
        const from = (date as DateRange).from?.toLocaleDateString('en-GB');
        const to = (date as DateRange).to?.toLocaleDateString('en-GB');
        const isValidDate = from && to && from !== to;

        let tmp: ArrayStringProps = [];
        if (isValidDate) tmp.push(from);
        if (isValidDate) tmp.push(to);
        tmp = joinArrayString(tmp, ' - ');

        if (tmp) data = tmp;
    }

    if (date && mode === 'single') {
        data = (date as Date).toLocaleDateString('en-GB');
    }

    return data;
};
