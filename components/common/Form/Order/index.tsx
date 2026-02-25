'use client';

import React, { Suspense } from 'react';

import { ParamsEvents } from '@/libs/hooks';

import { useForm } from 'react-hook-form';

import Input, { BaseInputSelectProps } from '@/components/common/Input';
import Button from '@/components/common/Button';
import Columns from '@/components/common/Columns';

export const ORDER_FORM_HANDLE = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    COLLECTION: 'collection',
} as const;

export type OrderFormFields = {
    [ORDER_FORM_HANDLE.FIRST_NAME]: string;
    [ORDER_FORM_HANDLE.LAST_NAME]: string;
    [ORDER_FORM_HANDLE.COLLECTION]: string;
};

export type OrderProps = {
    collection?: BaseInputSelectProps['items'];
    onFormSubmit?: (data: OrderFormFields) => void;
};

const Order = ({ collection, onFormSubmit }: OrderProps): React.ReactElement => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OrderFormFields>({ mode: 'onChange' });

    return (
        <>
            <Suspense fallback={null}>
                <ParamsEvents
                    onChange={({ params }) => {
                        if (params) {
                            const formKeys = Object.values(ORDER_FORM_HANDLE);

                            Object.entries(params).forEach(([key, value]) => {
                                const isValid = formKeys.includes(key as any);

                                if (isValid) setValue(key as any, value);
                            });
                        }
                    }}
                />
            </Suspense>

            <form
                onSubmit={handleSubmit((data) => {
                    if (onFormSubmit) onFormSubmit(data);
                })}>
                <Columns className="mb-3">
                    <Columns.Column md={6}>
                        <Input.Label
                            type="text"
                            id={ORDER_FORM_HANDLE.FIRST_NAME}
                            label="First Name"
                            hook={{
                                register,
                                name: ORDER_FORM_HANDLE.FIRST_NAME,
                                required: true,
                            }}
                            error={errors?.[ORDER_FORM_HANDLE.FIRST_NAME]?.message}
                        />
                    </Columns.Column>
                    <Columns.Column md={6}>
                        <Input.Label
                            type="text"
                            id={ORDER_FORM_HANDLE.LAST_NAME}
                            label="Last Name"
                            hook={{
                                register,
                                name: ORDER_FORM_HANDLE.LAST_NAME,
                                required: true,
                            }}
                            error={errors?.[ORDER_FORM_HANDLE.LAST_NAME]?.message}
                        />
                    </Columns.Column>
                </Columns>

                <Columns className="mb-3">
                    {collection && collection.length > 0 && (
                        <Columns.Column md={6}>
                            <Input.Label
                                type="select"
                                id={ORDER_FORM_HANDLE.COLLECTION}
                                label={ORDER_FORM_HANDLE.COLLECTION}
                                items={collection}
                                hook={{
                                    register,
                                    name: ORDER_FORM_HANDLE.COLLECTION,
                                    required: true,
                                }}
                                error={errors?.[ORDER_FORM_HANDLE.COLLECTION]?.message}
                            />
                        </Columns.Column>
                    )}
                </Columns>

                <Button.Container className="mt-3 justify-end">
                    <Button.Block
                        as="button"
                        type="submit"
                        size="lg">
                        Submit
                    </Button.Block>
                </Button.Container>
            </form>
        </>
    );
};

export default Order;
