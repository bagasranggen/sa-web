import React, { JSX } from 'react';
import { Metadata } from 'next';

export type ObjectProps<Props> = { [key: string]: Props };

export type TypesProps<Type, Props> = {
    type: Type;
} & Props;

export type PageProps = {
    params: Promise<ObjectProps<string | string[]>>;
    searchParams?: Promise<ObjectProps<string | string[] | undefined>>;
};

export type PageDataParamsProps = {
    type?: string;
    uri?: string;
    slug?: string;
};

export type PageUriItemProps = {
    slug: string[];
};

export type PageDataProps<Props> = {
    // page: {
    //     seomatic: any;
    // };
    meta?: Metadata;
} & (Pick<PageDataParamsProps, 'type'> & Props);

export type Component<Props> = { (props: Props): React.ReactElement | null };

export type RefComponent<Props, Element> = React.ForwardRefExoticComponent<Props & React.RefAttributes<Element>>;

export type ClassnameProps = { className?: string };

export type ArrayStringProps = string[] | string;

export type ElementTagsProps = keyof JSX.IntrinsicElements;

export type ResponsiveProps = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type BreakpointsProps = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
