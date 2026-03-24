import { joinArrayString } from '@/libs/utils/joinArrayString';

export const convertDMYToMDY = (date: string) => {
    let data: string = '';

    if (date) {
        const [d, m, y] = date.split('/');

        data = new Date(joinArrayString([m, d, y], '/')).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return data;
};
