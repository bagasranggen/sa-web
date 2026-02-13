import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ElementTagsProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type ContainerProps = {
    as?: Extract<ElementTagsProps, 'section' | 'div'>;
} & (PropsWithChildren & ClassnameProps);

const Container = ({ as: BlockContainer = 'div', className, children }: ContainerProps): React.ReactElement => {
    let containerClass: ArrayStringProps = ['container'];
    if (className) containerClass.push(className);
    containerClass = joinArrayString(containerClass);

    return <BlockContainer className={containerClass}>{children}</BlockContainer>;
};

export default Container;
