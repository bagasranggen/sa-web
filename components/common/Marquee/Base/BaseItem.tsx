import React, { forwardRef, PropsWithChildren } from 'react';

export type BaseItemProps = PropsWithChildren;

const BaseItem = forwardRef<HTMLDivElement, BaseItemProps>(({ children }, ref) => {
    return (
        <div
            ref={ref}
            className="marquee__item">
            {children}
        </div>
    );
});

export default BaseItem;
