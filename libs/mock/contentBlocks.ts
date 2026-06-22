import parse from 'html-react-parser';

import { RICH_TEXT_FULL, TEXT_2_PARAGRAPH } from './text';

import { CbLabelContentProps } from '@/components/common/ContentBlocks/CbLabelContent';

export const CB_LABEL_CONTENT: CbLabelContentProps = {
    typeHandle: 'labelContent',
    className: 'mt-6',
    heading: 'Biaya',
    // content: parse(TEXT_2_PARAGRAPH),
    content: RICH_TEXT_FULL,
};
