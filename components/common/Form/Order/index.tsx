'use client';

import React, { Suspense } from 'react';

import { DELIVERY_OPTIONS, DELIVERY_OPTIONS_HANDLE } from '@/libs/mock';
import { ParamsEvents } from '@/libs/hooks';
import { getInputDayPickerValue } from '@/libs/utils';

import { MapPin } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

import Input, { BaseInputSelectProps } from '@/components/common/Input';
import Button, { BaseAnchorProps, BaseButtonProps } from '@/components/common/Button';
import Columns from '@/components/common/Columns';

export const ORDER_FORM_HANDLE = {
    NAME: 'name',
    INSTAGRAM: 'instagram',
    CONTACT: 'contact',
    COLLECTION: 'collection',
    DATE: 'date',
    DELIVERY_METHOD: 'deliveryMethod',
    ADDRESS: 'address',
    ADDRESS_PIN_POINT: 'addressPinPoint',
} as const;

export type OrderFormFields = {
    [ORDER_FORM_HANDLE.NAME]: string;
    [ORDER_FORM_HANDLE.INSTAGRAM]: string;
    [ORDER_FORM_HANDLE.CONTACT]: string;
    [ORDER_FORM_HANDLE.COLLECTION]: string;
    [ORDER_FORM_HANDLE.DATE]: string;
    [ORDER_FORM_HANDLE.DELIVERY_METHOD]: string;
    [ORDER_FORM_HANDLE.ADDRESS]: string;
    [ORDER_FORM_HANDLE.ADDRESS_PIN_POINT]: string;
};

export type OrderProps = {
    collection?: BaseInputSelectProps['items'];
    pickupAddress?: {
        title?: React.ReactNode;
    } & Pick<BaseAnchorProps, 'target' | 'href' | 'children'>;
    onFormSubmit?: (data: OrderFormFields) => void;
    submitButton?: Pick<BaseButtonProps, 'disabled' | 'children'>;
};

const Order = ({ collection, onFormSubmit, pickupAddress, submitButton }: OrderProps): React.ReactElement => {
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        control,
        formState: { errors },
    } = useForm<OrderFormFields>({ mode: 'onChange' });

    const deliveryOption = useWatch({ control, name: ORDER_FORM_HANDLE.DELIVERY_METHOD });
    const showDeliveryAddress = [DELIVERY_OPTIONS_HANDLE.OJOL, DELIVERY_OPTIONS_HANDLE.PAXEL].includes(deliveryOption);
    const showPickupAddress = [DELIVERY_OPTIONS_HANDLE.PICKUP].includes(deliveryOption);

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
                <Columns
                    gutterY={3}
                    className="mb-3">
                    <Columns.Column md={4}>
                        <Input.Label
                            type="text"
                            id={ORDER_FORM_HANDLE.NAME}
                            label="Name"
                            hook={{
                                register,
                                name: ORDER_FORM_HANDLE.NAME,
                                required: true,
                            }}
                            error={errors?.[ORDER_FORM_HANDLE.NAME]?.message}
                        />
                    </Columns.Column>

                    <Columns.Column md={4}>
                        <Input.Label
                            type="text"
                            id={ORDER_FORM_HANDLE.INSTAGRAM}
                            label="Instagram"
                            hook={{
                                register,
                                name: ORDER_FORM_HANDLE.INSTAGRAM,
                                required: true,
                                pattern: {
                                    value: /^@[a-zA-Z0-9_]+$/,
                                    message: 'Please enter your username with @username format',
                                },
                            }}
                            error={errors?.[ORDER_FORM_HANDLE.INSTAGRAM]?.message}
                        />
                    </Columns.Column>

                    <Columns.Column md={4}>
                        <Input.Label
                            type="tel"
                            id={ORDER_FORM_HANDLE.CONTACT}
                            label="Contact"
                            hook={{
                                register,
                                name: ORDER_FORM_HANDLE.CONTACT,
                                required: true,
                            }}
                            error={errors?.[ORDER_FORM_HANDLE.CONTACT]?.message}
                        />
                    </Columns.Column>
                </Columns>

                <Columns
                    gutterY={3}
                    className="mb-3">
                    {collection && collection.length > 0 && (
                        <Columns.Column md={6}>
                            <Input.Label
                                type="select"
                                id={ORDER_FORM_HANDLE.COLLECTION}
                                label="Collection"
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

                    <Columns.Column md={6}>
                        <Input.Label
                            type="day-picker"
                            id={ORDER_FORM_HANDLE.DATE}
                            label={ORDER_FORM_HANDLE.DATE}
                            hook={{
                                register,
                                name: ORDER_FORM_HANDLE.DATE,
                                required: true,
                            }}
                            calendar={{
                                mode: 'range',
                                min: 1,
                                max: 2,
                                onSelect: (selected) => {
                                    const date = getInputDayPickerValue({ date: selected, mode: 'range' });

                                    if (date) {
                                        setValue(ORDER_FORM_HANDLE.DATE, date);
                                        clearErrors(ORDER_FORM_HANDLE.DATE);
                                    }
                                },
                            }}
                            error={errors?.[ORDER_FORM_HANDLE.DATE]?.message}
                        />
                    </Columns.Column>
                </Columns>

                <div className="mb-3">
                    <Input.Label
                        type="select"
                        id={ORDER_FORM_HANDLE.DELIVERY_METHOD}
                        label="Delivery Method"
                        items={DELIVERY_OPTIONS}
                        hook={{
                            register,
                            name: ORDER_FORM_HANDLE.DELIVERY_METHOD,
                            required: true,
                        }}
                        error={errors?.[ORDER_FORM_HANDLE.DELIVERY_METHOD]?.message}
                    />

                    {showPickupAddress && pickupAddress && pickupAddress?.href && (
                        <div className="mt-2 px-2">
                            {pickupAddress?.title && (
                                <p className="mb-0">
                                    <strong>{pickupAddress?.title}</strong>
                                </p>
                            )}

                            {pickupAddress?.href && pickupAddress?.children && (
                                <Button
                                    as="anchor"
                                    href={pickupAddress.href}
                                    target={pickupAddress?.target}
                                    className="flex lg:items-center gap-x-0.5 mt-0.5">
                                    <MapPin
                                        size={16}
                                        className="shrink-0"
                                    />

                                    <p>{pickupAddress.children}</p>
                                </Button>
                            )}
                        </div>
                    )}

                    {showDeliveryAddress && (
                        <>
                            <Input.Label
                                type="text"
                                className="mt-3"
                                id={ORDER_FORM_HANDLE.ADDRESS}
                                label="Address"
                                hook={{
                                    register,
                                    name: ORDER_FORM_HANDLE.ADDRESS,
                                    required: true,
                                }}
                                error={errors?.[ORDER_FORM_HANDLE.ADDRESS]?.message}
                            />

                            <Input.Label
                                type="text"
                                className="mt-3"
                                id={ORDER_FORM_HANDLE.ADDRESS_PIN_POINT}
                                label="Address Pin Point"
                                hook={{
                                    register,
                                    name: ORDER_FORM_HANDLE.ADDRESS_PIN_POINT,
                                    required: true,
                                }}
                                error={errors?.[ORDER_FORM_HANDLE.ADDRESS_PIN_POINT]?.message}
                            />
                        </>
                    )}
                </div>

                <Button.Container className="mt-3 justify-end">
                    <Button.Block
                        as="button"
                        type="submit"
                        size="lg"
                        disabled={submitButton?.disabled}>
                        {submitButton?.children ?? 'Submit'}
                    </Button.Block>
                </Button.Container>
            </form>
        </>
    );
};

export default Order;
