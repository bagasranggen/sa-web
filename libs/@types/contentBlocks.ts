import { ClassnameProps } from '@/libs/@types/common';

export type ContentBlocksBaseProp = {
    isNested?: boolean;
};

export type ContentBlocksComponentProps<Type, Props> = {
    order?: number;
    typeHandle?: Type;
} & (Props & ClassnameProps & Pick<ContentBlocksBaseProp, 'isNested'>);
