import React, { PropsWithChildren } from 'react';

import Heading, { BaseProps as BaseHeadingProps } from '@/components/common/Heading';
import List, { BaseProps as BaseListProps } from '@/components/common/List';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import { ArrayStringProps, Component } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type FooterSubItemProps = Pick<BaseAnchorProps, 'href' | 'target' | 'children' | 'className'>;

export type FooterSubProps = {
    title: BaseHeadingProps['children'];
    list?: {
        type?: 'inline' | 'regular';
        items: FooterSubItemProps[];
    };
} & Partial<PropsWithChildren>;

const FooterSub = ({ title, list, children }: FooterSubProps): React.ReactElement => {
    let FooterList: Component<BaseListProps> = List;
    if (list?.type === 'inline') FooterList = List.Inline;

    let footerClass: ArrayStringProps = ['mt-1 md:mt-1.5'];
    if (list?.type === 'inline') footerClass.push('max-md:justify-center');
    footerClass = joinArrayString(footerClass);

    return (
        <>
            <Heading
                as="h3"
                className="text-sekar-primary uppercase text-md font-bold tracking-[.3rem]">
                {title}
            </Heading>

            {list?.items && list.items.length > 0 && (
                <FooterList
                    className={footerClass}
                    items={list.items.map((item) => {
                        return {
                            children: (
                                <Button
                                    as="anchor"
                                    className="tracking-[.1rem]"
                                    {...item}
                                />
                            ),
                        };
                    })}
                />
            )}

            {children}
        </>
    );
};

export default FooterSub;
