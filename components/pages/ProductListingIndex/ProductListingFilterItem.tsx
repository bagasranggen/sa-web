'use client';

import React, { useEffect } from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import { useForm } from 'react-hook-form';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuContentProps,
    DropdownMenuGroup,
    DropdownMenuGroupProps,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/DropdownMenu';
import Button, { BaseAnchorProps, BlockProps } from '@/components/common/Button';
import Input from '@/components/common/Input';

export type FilterFormFields = Partial<Record<string, string[]>>;

export type ProductListingCheckboxItemProps = Record<'label' | 'value', string>;

export type ProductListingFilterItemProps = {
    button?: Pick<BlockProps, 'active' | 'className'>;
    checkbox?: ProductListingCheckboxItemProps[];
    select?: ProductListingCheckboxItemProps[];
    content?: Pick<DropdownMenuContentProps, 'align' | 'className'>;
    group?: Pick<DropdownMenuGroupProps, 'className'>;
    handle?: string;
    active?: FilterFormFields;
    children: BaseAnchorProps['children'];
    onOpenChange?: (open: boolean, form?: any) => void;
};

const ProductListingFilterItem = ({
    onOpenChange,
    content,
    group,
    handle,
    button,
    checkbox,
    select,
    active,
    children,
}: ProductListingFilterItemProps): React.ReactElement | null => {
    const { register, getValues, setValue } = useForm<FilterFormFields>({
        mode: 'onChange',
        defaultValues: active,
    });

    let contentClass: ArrayStringProps = ['min-w-15'];
    if (content?.className) contentClass.push(content.className);
    contentClass = joinArrayString(contentClass);

    useEffect(() => {
        if (!handle) return;

        const selected = active?.[handle];

        setValue(handle, selected);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, handle]);

    if (!handle) return null;
    if (!children) return null;

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (onOpenChange) onOpenChange(open, { ...getValues() });
            }}>
            <DropdownMenuTrigger asChild>
                <Button.Block
                    as="button"
                    className={button?.className}
                    active={button?.active}>
                    {children}
                </Button.Block>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className={contentClass}
                align={content?.align ?? 'start'}>
                <DropdownMenuGroup className={group?.className}>
                    {checkbox && checkbox.length > 0 && (
                        <>
                            {checkbox.map((item, i) => {
                                return (
                                    <Input
                                        key={i}
                                        type="checkbox"
                                        value={item.value}
                                        id={`${handle}_${item.value}`}
                                        hook={{
                                            register,
                                            name: handle,
                                        }}>
                                        {item.label}
                                    </Input>
                                );
                            })}
                        </>
                    )}

                    {select && select.length > 0 && (
                        <>
                            {select.map((item, i) => {
                                return (
                                    <DropdownMenuItem
                                        key={i}
                                        onClick={() => {
                                            setValue(handle, [item.value]);
                                        }}
                                        className="md:hover:bg-dark/10 md:transition-colors cursor-pointer uppercase tracking-0.3">
                                        {item.label}
                                    </DropdownMenuItem>
                                );
                            })}
                        </>
                    )}
                </DropdownMenuGroup>

                {/*<DropdownMenuSeparator />*/}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProductListingFilterItem;
