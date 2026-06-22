import { CbLabelContentProps } from '@/components/common/ContentBlocks/CbLabelContent/index';

export const CbLabelContentData = (
    props: Partial<CbLabelContentProps>
): Partial<Pick<CbLabelContentProps, 'content' | 'heading'>> => {
    return {
        content: props?.content,
        heading: props.heading,
    };
};
