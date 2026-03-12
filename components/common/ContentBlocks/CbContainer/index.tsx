import React, { Fragment } from 'react';

import { ArrayStringProps, ClassnameProps, ContentBlocksBaseProp } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Container, { ContainerProps } from '@/components/common/Container';
import DynamicElement from '@/components/common/DynamicElement';
import Animation from '@/components/common/Animation';

export type CbContainerProps = {
    extraWrapper?: boolean;
    typeClassName?: ClassnameProps['className'];
    animation?: ContentBlocksBaseProp['animation'];
} & (Pick<ContainerProps, 'children' | 'className'> & Pick<ContentBlocksBaseProp, 'isNested'>);

const CbContainer = ({
    extraWrapper,
    isNested = false,
    className,
    typeClassName,
    animation,
    children,
}: CbContainerProps): React.ReactElement => {
    let containerClass: ArrayStringProps = [];
    if (className) containerClass.push(className);
    if (typeClassName) containerClass.push(typeClassName);
    containerClass = joinArrayString(containerClass);

    let wrapperProps = {};
    if (extraWrapper) wrapperProps = Object.assign(wrapperProps, { className: containerClass });

    let animationEnabled: NonNullable<CbContainerProps['animation']>['enabled'] = true;
    if (typeof animation?.enabled !== 'undefined' && !animation.enabled) animationEnabled = false;

    return (
        <DynamicElement
            component={extraWrapper ? 'section' : Fragment}
            props={wrapperProps}>
            <Animation
                type={animationEnabled ? 'fade-in' : undefined}
                config={{ delay: animation?.delay }}>
                <Container
                    as={isNested || extraWrapper ? 'div' : 'section'}
                    type={isNested ? 'none' : undefined}
                    className={!extraWrapper ? containerClass : undefined}>
                    {children}
                </Container>
            </Animation>
        </DynamicElement>
    );
};

export default CbContainer;
