import React, { PropsWithChildren } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Loader from '@/components/common/Loader';
import Animation from '@/components/common/Animation';

export type ListingWrapperProps = {
    isLoading?: boolean;
} & PropsWithChildren;

const ListingWrapper = ({ isLoading, children }: ListingWrapperProps): React.ReactElement => {
    let wrapperClass: ArrayStringProps = [];
    if (isLoading) {
        wrapperClass.push(
            "relative after:content-[''] after:absolute after:z-10 after:top-0 after:w-full after:h-full after:backdrop-blur-[.4rem] after:bg-light/30"
        );
    }
    wrapperClass = joinArrayString(wrapperClass);

    return (
        <div className={wrapperClass}>
            {isLoading && (
                <Animation type="fade">
                    <div className="mb-[calc((57px+4rem)*-1)] sticky top-1/2 z-20">
                        <Loader className="flex flex-col items-center ">Loading</Loader>
                    </div>
                </Animation>
            )}

            {children}
        </div>
    );
};

export default ListingWrapper;
