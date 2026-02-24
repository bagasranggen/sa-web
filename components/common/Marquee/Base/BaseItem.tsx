import React, { forwardRef, PropsWithChildren } from 'react';

export type BaseItemProps = PropsWithChildren;

const BaseItem = forwardRef<HTMLDivElement, BaseItemProps>(({ children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="marquee__item"
            {...props}>
            {children}
        </div>
    );
});

BaseItem.displayName = 'BaseItem';
export default BaseItem;
