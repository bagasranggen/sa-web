import { PageDataParamsProps, PageDataProps } from '@/libs/@types';
import { getEntryTypeHandle } from '@/libs/utils/getEntryTypeHandle';

import { PAGES_DATA_HANDLES } from '@/components/pages/handlesData';

export type GetPagesDataProps = Pick<PageDataParamsProps, 'uri' | 'slug'>;

export const getPagesData = async ({ uri, slug }: GetPagesDataProps) => {
    const typeHandle = await getEntryTypeHandle({ uri });

    let dataProcessor: any = undefined;
    if (typeHandle && PAGES_DATA_HANDLES?.[typeHandle]) dataProcessor = PAGES_DATA_HANDLES[typeHandle];

    let data: PageDataProps<any> | undefined = undefined;

    if (typeHandle && dataProcessor) {
        try {
            data = dataProcessor({
                typeHandle,
                uri,
                slug,
            });
        } catch {}
    }

    return data;
};
