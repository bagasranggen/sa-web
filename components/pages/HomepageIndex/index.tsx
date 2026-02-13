import React from 'react';

import { createPicsumImage } from '@/libs/factory';

import Container from '@/components/common/Container';
import Picture from '@/components/common/Picture';

export type HomepageIndexProps = {};

const HomepageIndex = ({}: HomepageIndexProps): React.ReactElement => {
    return (
        <>
            <Container>
                <h1 className="font-aboreto text-[4rem]">Hello World</h1>

                <Picture
                    className="block mt-3"
                    items={[{ ...createPicsumImage({ width: 1600, height: 1200 }), media: 768 }, createPicsumImage({})]}
                />

                <p className="mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eos inventore, magnam molestias
                    natus nostrum odit? Dignissimos eligendi esse facere, officiis quaerat saepe temporibus? Cum error
                    inventore odio quaerat unde.
                </p>
            </Container>
        </>
    );
};

export default HomepageIndex;
