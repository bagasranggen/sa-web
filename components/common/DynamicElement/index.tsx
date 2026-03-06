import React, { createElement, FunctionComponent, PropsWithChildren } from 'react';

import { ElementTagsProps } from '@/libs/@types';
import { getEnv } from '@/libs/utils';

export type DynamicElementProps<Props> = {
    handles?: string;
    component?: FunctionComponent<Props> | ElementTagsProps;
    props?: Props;
} & PropsWithChildren;

const DynamicElement = <Props extends {}>({
    handles,
    component,
    props,
    children,
}: DynamicElementProps<Props>): React.ReactElement | null => {
    const { isProduction } = getEnv();

    if (!component) {
        if (!isProduction) {
            console.warn({ handles, message: `component: ${handles} is not defined` });
        }

        return null;
    }

    return createElement(component, props, children);
};

export default DynamicElement;
