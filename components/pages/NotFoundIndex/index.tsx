import React from 'react';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';

export type NotFoundIndexProps = {};

const NotFoundIndex = ({}: NotFoundIndexProps): React.ReactElement => {
    return (
        <Container
            as="section"
            className="mt-21 mb-24">
            <div className="text-center">
                <Heading
                    as="h1"
                    family="aboreto"
                    variant="page">
                    <span className="text-sekar-primary">404</span> – This Fit Doesn’t Exist
                </Heading>

                <div className="mt-2 text-lg">
                    <p className="mb-0">Looks like this page is out of stock or never made it to the collection.</p>
                    <p>Let&#39;s get you back to something stylish.</p>
                </div>

                <Button.Container className="mt-3 justify-center">
                    <Button.Block
                        as="anchor"
                        size="lg"
                        href="/">
                        Back to Home
                    </Button.Block>
                </Button.Container>
            </div>
        </Container>
    );
};

export default NotFoundIndex;
