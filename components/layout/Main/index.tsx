'use client';

import React, { PropsWithChildren } from 'react';

import { ProgressProvider } from '@bprogress/next/app';

export type MainProps = {} & PropsWithChildren;

const Main = ({ children }: MainProps): React.ReactElement => {
    return (
        <ProgressProvider
            height="2px"
            color="var(--color-sekar-primary)"
            options={{ showSpinner: false }}
            shallowRouting>
            {children}
        </ProgressProvider>
    );
};

export default Main;
