import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import DynamicWrapper, { DynamicWrapperProps } from '@/components/common/DynamicWrapper';

export type CircleProps<Props> = {
    color?: 'dark' | 'light' | 'primary';
    size?: 'sm' | 'md' | 'lg';
} & (PropsWithChildren & ClassnameProps & Pick<DynamicWrapperProps<Props>, 'as'>);

const Circle = <Props,>({
    as,
    color = 'dark',
    size = 'md',
    className,
    children,
}: CircleProps<Props>): React.ReactElement => {
    let wrapperClass: ArrayStringProps = ['icon icon--circle'];
    if (className) wrapperClass.push(className);
    if (color === 'dark') wrapperClass.push('icon--dark');
    if (color === 'light') wrapperClass.push('icon--light');
    if (color === 'primary') wrapperClass.push('icon--primary');
    if (size === 'sm') wrapperClass.push('icon--sm');
    if (size === 'md') wrapperClass.push('icon--md');
    if (size === 'lg') wrapperClass.push('icon--lg');
    wrapperClass = joinArrayString(wrapperClass);

    return (
        <DynamicWrapper
            as={as}
            className={wrapperClass}>
            {children}
        </DynamicWrapper>
    );
};

export default Circle;
