import React, { ExoticComponent, Fragment, FragmentProps, PropsWithChildren } from 'react';

import { ClassnameProps, ElementTagsProps } from '@/libs/@types';

export type LoaderProps = {} & ClassnameProps & PropsWithChildren;

const Loader = ({ className, children }: LoaderProps): React.ReactElement => {
    let Wrapper: ExoticComponent<FragmentProps> | ElementTagsProps = Fragment;
    if (className) Wrapper = 'div';

    return (
        <Wrapper {...(className ? { className } : {})}>
            <div className="loader" />

            {children && <div className="mt-1 uppercase font-bold tracking-[0.3rem] text-sm">{children}</div>}
        </Wrapper>
    );
};

export default Loader;
