import { CB_HANDLES } from '@/components/common/ContentBlocks/handles';

import CbLabelContent from '@/components/common/ContentBlocks/CbLabelContent';
import CbText from '@/components/common/ContentBlocks/CbText';

export const CB_COMPONENT_HANDLES = {
    [CB_HANDLES.LABEL_CONTENT]: CbLabelContent,
    [CB_HANDLES.TEXT]: CbText,
} as const;
