import React, { forwardRef, PropsWithChildren } from 'react';

import { ArrayStringProps, ElementTagsProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type BaseProps = {
    as?: Extract<ElementTagsProps, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
    variant?: 'section';
    family?: 'aboreto' | 'space-grotesk';
} & (React.HTMLAttributes<HTMLHeadingElement> & PropsWithChildren);

const Base = forwardRef<HTMLHeadingElement, BaseProps>(
    ({ as: Heading = 'h2', className, variant, family, children, ...props }, ref) => {
        let headingClass: ArrayStringProps = [];
        if (family === 'aboreto') headingClass.push('font-aboreto');
        if (variant) headingClass.push('heading');
        if (variant === 'section') headingClass.push('heading--section');
        if (className) headingClass.push(className);
        headingClass = joinArrayString(headingClass);

        let headingProps = props;
        if (headingClass) headingProps = Object.assign(headingProps, { className: headingClass });

        return (
            <Heading
                ref={ref}
                {...headingProps}>
                {children}
            </Heading>
        );
    }
);

Base.displayName = 'Base';

export default Base;
