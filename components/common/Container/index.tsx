import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ElementTagsProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type ContainerProps = {
    as?: Extract<ElementTagsProps, 'section' | 'div'>;
    type?: 'fluid' | 'regular' | 'full-screen';
} & (PropsWithChildren & ClassnameProps);

const Container = ({
    as: BlockContainer = 'div',
    type = 'regular',
    className,
    children,
}: ContainerProps): React.ReactElement => {
    let containerClass: ArrayStringProps = [];
    if (type === 'regular') containerClass.push('container');
    if (type === 'fluid') containerClass.push('container-fluid');
    if (type === 'full-screen') containerClass.push('container-full');
    if (className) containerClass.push(className);
    containerClass = joinArrayString(containerClass);

    return <BlockContainer className={containerClass}>{children}</BlockContainer>;
};

export default Container;
