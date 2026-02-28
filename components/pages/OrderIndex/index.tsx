'use client';

import React from 'react';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Form, { OrderProps } from '@/components/common/Form';

export type OrderIndexProps = {
    entries: {
        form: Pick<OrderProps, 'collection' | 'pickupAddress'>;
    };
};

const OrderIndex = ({ entries }: OrderIndexProps): React.ReactElement => {
    return (
        <>
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

            {entries?.form && (
                <Container
                    as="section"
                    className="mt-8 mb-15">
                    <Form.Order
                        collection={entries.form.collection}
                        pickupAddress={entries.form.pickupAddress}
                        onFormSubmit={(data) => {
                            console.log({ data });
                        }}
                    />
                </Container>
            )}
        </>
    );
};

export default OrderIndex;
