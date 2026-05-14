import React, { PropsWithChildren } from 'react';

import { ClassnameProps } from '@/libs/@types';

import Heading, { BaseProps } from '@/components/common/Heading';
import List from '@/components/common/List';
import RichText, { RichTextProps } from '@/components/common/RichText';

export type DetailListItemProps = Record<'label' | 'value', React.ReactNode>;

export type DetailInfoProps = {
    title?: BaseProps['children'];
    list?: DetailListItemProps[];
    richText?: RichTextProps['children'];
} & (ClassnameProps & PropsWithChildren);

const DetailInfo = ({ title, className, list, richText, children }: DetailInfoProps): React.ReactElement => {
    return (
        <div className={className}>
            {title && (
                <Heading
                    as="h3"
                    className="text-md uppercase tracking-0.3 font-bold">
                    {title}:
                </Heading>
            )}

            {list && list.length > 0 && (
                <List
                    className="mt-0.5"
                    items={list.map((item: DetailListItemProps) => {
                        let children = <>{item.value}</>;

                        if (item?.value && item?.label) {
                            children = (
                                <div className="flex justify-between">
                                    <div>{item.label}</div>
                                    <div>{item.value}</div>
                                </div>
                            );
                        }

                        return { children };
                    })}
                />
            )}

            {richText && <RichText>{richText}</RichText>}

            {children}
        </div>
    );
};

export default DetailInfo;
