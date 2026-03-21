import React, { PropsWithChildren } from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Heading from '@/components/common/Heading';
import List from '@/components/common/List';
import Button, { BaseAnchorProps } from '@/components/common/Button';

export type ProductListingLinkItemProps = Pick<BaseAnchorProps, 'href' | 'children' | 'target'>;

export type ProductListingNotFoundProps = {
    show?: boolean;
    subtitle?: string;
    links?: ProductListingLinkItemProps[];
} & (PropsWithChildren & ClassnameProps);

const ProductListingNotFound = ({
    show = false,
    subtitle,
    children,
    className,
    links,
}: ProductListingNotFoundProps): React.ReactElement | null => {
    if (!show) return null;

    let wrapperClass: ArrayStringProps = ['text-center'];
    if (className) wrapperClass.push(className);
    wrapperClass = joinArrayString(wrapperClass);

    return (
        <div className={wrapperClass}>
            <Heading
                as="h3"
                className="uppercase text-6xl tracking-0.4 lg:max-w-3/4 mx-auto">
                {children}
            </Heading>

            {subtitle && <p className="text-[2rem] mt-2.5 not-last:mb-1">{subtitle}</p>}

            {links && links.length > 0 && (
                <List.Inline
                    className="justify-center"
                    items={links.map((item) => {
                        return {
                            children: (
                                <Button
                                    as="anchor"
                                    className="uppercase tracking-0.2 font-bold"
                                    {...item}
                                />
                            ),
                        };
                    })}
                />
            )}
        </div>
    );
};

export default ProductListingNotFound;
