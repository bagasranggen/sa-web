import { ClassnameProps } from '@/libs/@types/common';
import { FadeConfigProps } from '@/components/common/Animation';

export type ContentBlocksBaseProp = {
    isNested?: boolean;
    animation?: {
        enabled?: boolean;
    } & Pick<FadeConfigProps, 'delay'>;
};

export type ContentBlocksComponentProps<Type, Props> = {
    order?: number;
    typeHandle?: Type;
} & (Props & ClassnameProps & Pick<ContentBlocksBaseProp, 'isNested' | 'animation'>);
