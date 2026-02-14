import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type ContainerProps = PropsWithChildren & ClassnameProps;

const Container = ({ className, children }: ContainerProps): React.ReactElement => {
    let containerClass: ArrayStringProps = ['btn-container'];
    if (className) containerClass.push(className);
    containerClass = joinArrayString(containerClass);

    return <div className={containerClass}>{children}</div>;
};

export default Container;
