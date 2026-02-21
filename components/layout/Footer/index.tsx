import React from 'react';

import Container from '@/components/common/Container';
import Columns from '@/components/common/Columns';
import FooterSub from '@/components/layout/Footer/FooterSub';
import Picture, { BaseItemProps } from '@/components/common/Picture';

import Logo from '@/assets/images/logo-sekar.png';

export type FooterProps = {};

const Footer = ({}: FooterProps): React.ReactElement => {
    return (
        <footer className="bg-sekar-accent py-6">
            <Container>
                <Columns
                    className="max-md:text-center justify-between"
                    gutterY={3}>
                    <Columns.Column md={3}>
                        <FooterSub
                            title="General Info"
                            list={{
                                items: [
                                    {
                                        href: '#',
                                        children: 'How to Rent',
                                    },
                                    {
                                        href: '#',
                                        children: 'Rent T&C',
                                    },
                                ],
                            }}
                        />
                    </Columns.Column>

                    <Columns.Column
                        md={4}
                        lg={3}>
                        <FooterSub
                            title="Connect With Us"
                            list={{
                                type: 'inline',
                                items: [
                                    {
                                        href: '#',
                                        children: 'Instagram',
                                    },
                                    {
                                        href: '#',
                                        children: 'Instagram',
                                    },
                                    {
                                        href: '#',
                                        children: 'Instagram',
                                    },
                                ],
                            }}
                        />
                    </Columns.Column>

                    <Columns.Column md={3}>
                        <FooterSub title="Location">
                            <div className="mt-1 md:mt-1.5">Yogyakarta</div>
                        </FooterSub>
                    </Columns.Column>
                </Columns>

                <div className="mt-5 text-center">
                    <Picture
                        className="inline-block"
                        imageClassName="max-w-[18rem]"
                        items={[Logo as BaseItemProps]}
                    />
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
