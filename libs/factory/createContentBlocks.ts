import { ArrayStringProps, ContentBlocks } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils/joinArrayString';
import { createContentBlocksSpacingItem } from '@/libs/factory/createContentBlocksSpacingItem';

import { CB_DATA_HANDLES } from '@/components/common/ContentBlocks/handlesData';
import { ContentBlocksProps } from '@/components/common/ContentBlocks';

export const createContentBlocks = ({ items }: { items?: ContentBlocks['blocks'] }) => {
    const data: ContentBlocksProps['items'] = [];

    if (items && items.length > 0) {
        items.forEach(({ blockType, ...item }, i: number) => {
            let tmp: any = {
                order: i,
                typeHandle: blockType,
                ...item,
            };

            const mtClass = createContentBlocksSpacingItem({ string: item?.cbSpacing?.marginTop, handle: 'mt' });
            const mbClass = createContentBlocksSpacingItem({ string: item?.cbSpacing?.marginBottom, handle: 'mt' });

            let cbClass: ArrayStringProps = [];
            if (mtClass) cbClass.push(mtClass);
            if (mbClass) cbClass.push(mbClass);
            cbClass = joinArrayString(cbClass);

            if (cbClass) tmp = Object.assign(tmp, { className: cbClass });

            const dataProcessing = CB_DATA_HANDLES?.[blockType];

            if (dataProcessing) tmp = Object.assign(tmp, dataProcessing(tmp as any));

            data.push(tmp);
        });
    }

    return data;
};
