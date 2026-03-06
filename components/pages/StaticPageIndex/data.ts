import { CB_LABEL_CONTENT } from '@/libs/mock';
import { PageDataParamsProps, PageDataProps } from '@/libs/@types';

import { StaticPageIndexProps } from '@/components/pages/StaticPageIndex';

export const StaticPageData = async ({
    typeHandle,
    uri,
}: PageDataParamsProps): Promise<PageDataProps<StaticPageIndexProps>> => {
    const contentBlocks: StaticPageIndexProps['entries']['contentBlocks'] = [
        CB_LABEL_CONTENT,
        { ...CB_LABEL_CONTENT, heading: 'Deposit & Jaminan Sewa' },
        { ...CB_LABEL_CONTENT, heading: 'Periode', className: 'mt-6 mb-15' },
    ];

    return {
        typeHandle,
        entries: {
            header: 'Terms & Conditions',
            contentBlocks,
        },
    };
};
