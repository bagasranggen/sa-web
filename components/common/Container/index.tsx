import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ElementTagsProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type ContainerProps = {
    as?: Extract<ElementTagsProps, 'section' | 'div'>;
    isFluid?: boolean;
} & (PropsWithChildren & ClassnameProps);

const Container = ({
    as: BlockContainer = 'div',
    className,
    isFluid,
    children,
}: ContainerProps): React.ReactElement => {
    let containerClass: ArrayStringProps = [];
    if (!isFluid) containerClass.push('container');
    if (isFluid) containerClass.push('container-fluid');
    if (className) containerClass.push(className);
    containerClass = joinArrayString(containerClass);

    return <BlockContainer className={containerClass}>{children}</BlockContainer>;
};

export default Container;
