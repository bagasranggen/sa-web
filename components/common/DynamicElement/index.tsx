import React, { createElement, FunctionComponent, PropsWithChildren } from 'react';

import { ElementTagsProps } from '@/libs/@types';
import { getEnv } from '@/libs/utils';

export type DynamicElementProps<Props> = {
    component?: FunctionComponent<Props> | ElementTagsProps;
    props?: Props;
} & PropsWithChildren;

const DynamicElement = <Props extends {}>({
    component,
    props,
    children,
}: DynamicElementProps<Props>): React.ReactElement | null => {
    const { isProduction } = getEnv();

    if (!component) {
        if (!isProduction) console.warn('component is not defined');

        return null;
    }

    return createElement(component, props, children);
};

export default DynamicElement;
