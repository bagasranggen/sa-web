'use client';

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ORDER_CONTACT_MESSAGE } from '@/libs/constants';
import { submitOrderForm } from '@/libs/actions';
import { sendWhatsappMessage, updateSearchParams } from '@/libs/utils';
import { ParamsEvents } from '@/libs/hooks';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Form, { OrderProps } from '@/components/common/Form';
import Animation from '@/components/common/Animation';

export type OrderIndexProps = {
    entries: {
        form: Pick<OrderProps, 'products' | 'collection' | 'pickupAddress'>;
    };
};

const OrderIndex = ({ entries }: OrderIndexProps): React.ReactElement => {
    const router = useRouter();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    if (isSuccess) {
        return (
            <Animation type="fade-in">
                <Container
                    as="section"
                    className="mt-25 mb-25">
                    <div className="text-center">
                        <Heading
                            as="h1"
                            className="text-[3rem]">
                            Your order is currently being processed
                        </Heading>
                        <p>We&#39;ll be in touch with an update shortly</p>
                    </div>
                </Container>
            </Animation>
        );
    }

    return (
        <>
            <Suspense fallback={null}>
                <ParamsEvents
                    onChange={({ params }) => {
                        if (params.status === 'success') setIsSuccess(true);
                    }}
                />
            </Suspense>

            <Animation
                type="fade-in"
                id="headingFade">
                <Container
                    as="section"
                    className="mt-8">
                    <Heading
                        as="h1"
                        variant="page"
                        className="text-center">
                        Order Confirmation
                    </Heading>
                </Container>
            </Animation>

            {entries?.form && (
                <Animation
                    type="fade-in"
                    config={{ delay: 'headingFade' }}>
                    <Container
                        as="section"
                        className="mt-8 mb-15">
                        <Form.Order
                            products={entries.form.products}
                            collection={entries.form.collection}
                            pickupAddress={entries.form.pickupAddress}
                            submitButton={{
                                disabled: isProcessing,
                                children: isProcessing ? 'Processing' : undefined,
                            }}
                            onFormSubmit={async (data) => {
                                // console.log({ data });

                                setIsProcessing(true);

                                await submitOrderForm(data).then((res) => {
                                    if (res.status === 'success') {
                                        router.push(updateSearchParams({ set: [{ key: 'status', value: 'success' }] }));
                                        setIsProcessing(false);
                                        sendWhatsappMessage({
                                            message: ORDER_CONTACT_MESSAGE({
                                                name: data?.collectionLabel ?? '',
                                                date: data?.date ?? '',
                                                id: data?.productId ?? '',
                                            }),
                                            target: '_blank',
                                        });
                                    }
                                });
                            }}
                        />
                    </Container>
                </Animation>
            )}
        </>
    );
};

export default OrderIndex;
