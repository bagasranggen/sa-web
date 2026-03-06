import React from 'react';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Button, { BaseButtonProps } from '@/components/common/Button';

export type ErrorIndexProps = {
    entries: {
        button?: Pick<BaseButtonProps, 'onClick'>;
    };
};

const ErrorIndex = ({ entries }: ErrorIndexProps): React.ReactElement => {
    return (
        <Container
            as="section"
            className="mt-21 mb-24">
            <div className="text-center">
                <Heading
                    as="h1"
                    family="aboreto"
                    variant="page">
                    Wardrobe Malfunction!
                </Heading>

                <div className="mt-2 text-lg">
                    <p className=" mb-0">
                        Looks like our server tried on too many outfits at once and tripped over the rack.
                    </p>
                    <p>We&#39;re fixing the fit right now.</p>
                </div>

                {entries?.button && (
                    <Button.Container className="mt-3 justify-center">
                        <Button.Block
                            as="button"
                            size="lg"
                            onClick={entries?.button?.onClick}>
                            Try again
                        </Button.Block>
                    </Button.Container>
                )}
            </div>
        </Container>
    );
};

export default ErrorIndex;
