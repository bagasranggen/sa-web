import React, { PropsWithChildren } from 'react';

import { ClassnameProps } from '@/libs/@types';

import DynamicWrapper from '@/components/common/DynamicWrapper';

export type LoaderProps = ClassnameProps & PropsWithChildren;

const Loader = ({ className, children }: LoaderProps): React.ReactElement => {
    return (
        <DynamicWrapper
            as={className ? 'div' : undefined}
            className={className}>
            <div className="loader" />

            {children && <div className="mt-1 uppercase font-bold tracking-[0.3rem] text-sm">{children}</div>}
        </DynamicWrapper>
    );
};

export default Loader;
