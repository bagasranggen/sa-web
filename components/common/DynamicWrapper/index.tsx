import React, { Fragment, PropsWithChildren } from 'react';

import { Component, ElementTagsProps, FragmentTagsProps, RefComponent } from '@/libs/@types';

export type DynamicWrapperProps<Props> = {
    as?: ElementTagsProps | Component<any> | RefComponent<any, any>;
} & (PropsWithChildren & Props);

const DynamicWrapper = <Props,>({ as, children, ...props }: DynamicWrapperProps<Props>): React.ReactElement => {
    let Wrapper: FragmentTagsProps | ElementTagsProps | Component<any> | RefComponent<any, any> = Fragment;
    if (as) Wrapper = as;

    let wrapperProps = {};
    if (as) wrapperProps = Object.assign(wrapperProps, props);

    return <Wrapper {...wrapperProps}>{children}</Wrapper>;
};

export default DynamicWrapper;
