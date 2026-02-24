import React, { Fragment } from 'react';

import {
    ArrayStringProps,
    ClassnameProps,
    ContentBlocksBaseProp,
    ElementTagsProps,
    FragmentTagsProps,
} from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Container, { ContainerProps } from '@/components/common/Container';
import DynamicElement from '@/components/common/DynamicElement';

export type CbContainerProps = {
    extraWrapper?: boolean;
    typeClassName?: ClassnameProps['className'];
} & (Pick<ContainerProps, 'children' | 'className'> & Pick<ContentBlocksBaseProp, 'isNested'>);

const CbContainer = ({
    extraWrapper,
    isNested = false,
    className,
    typeClassName,
    children,
}: CbContainerProps): React.ReactElement => {
    let containerClass: ArrayStringProps = [];
    if (className) containerClass.push(className);
    if (typeClassName) containerClass.push(typeClassName);
    containerClass = joinArrayString(containerClass);

    let wrapperComponent: FragmentTagsProps | ElementTagsProps = Fragment;
    if (extraWrapper) wrapperComponent = 'section';

    let wrapperProps = {};
    if (extraWrapper) wrapperProps = Object.assign(wrapperProps, { className: containerClass });

    return (
        <DynamicElement
            component={wrapperComponent}
            props={wrapperProps}>
            <Container
                as={isNested || extraWrapper ? 'div' : 'section'}
                type={isNested ? 'none' : undefined}
                className={!extraWrapper ? containerClass : undefined}>
                {children}
            </Container>
        </DynamicElement>
    );
};

export default CbContainer;
