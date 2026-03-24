'use client';

import React, { useState } from 'react';

import { submitOrderForm } from '@/libs/actions';
import { sendWhatsappMessage } from '@/libs/utils';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Form, { OrderProps } from '@/components/common/Form';
import Animation from '@/components/common/Animation';

export type OrderIndexProps = {
    entries: {
        form: Pick<OrderProps, 'collection' | 'pickupAddress'>;
    };
};

const OrderIndex = ({ entries }: OrderIndexProps): React.ReactElement => {
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
                                        setIsSuccess(true);
                                        setIsProcessing(false);
                                        sendWhatsappMessage({
                                            message: 'test',
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
