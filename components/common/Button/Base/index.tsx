'use client';

import React, { forwardRef, Ref } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Link, { LinkProps } from '@/components/common/Link';

export type BaseAnchorProps = {
    as?: 'anchor';
    linkAs?: LinkProps['as'];
} & Omit<LinkProps, 'as'>;

export type BaseButtonProps = {
    as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type BaseProps = BaseAnchorProps | BaseButtonProps;

export type BaseRefProps = HTMLAnchorElement | HTMLButtonElement | HTMLDivElement;

const Base = forwardRef<BaseRefProps, BaseProps>(({ className, as, ...props }, ref) => {
    let btnClass: ArrayStringProps = ['btn'];
    if (className) btnClass.push(className);
    btnClass = joinArrayString(btnClass);

    if (as === 'anchor') {
        return (
            <Link
                ref={ref as Ref<HTMLAnchorElement>}
                as={(props as BaseAnchorProps)?.linkAs}
                className={btnClass}
                {...(props as BaseAnchorProps)}
            />
        );
    }

    if (as === 'button') {
        return (
            <button
                ref={ref as Ref<HTMLButtonElement>}
                className={btnClass}
                {...(props as BaseButtonProps)}
            />
        );
    }

    return (
        <div
            ref={ref as Ref<HTMLDivElement>}
            className={btnClass}
            {...(props as any)}
        />
    );
});

Base.displayName = 'Base';
export default Base;
