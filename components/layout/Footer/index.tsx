import React from 'react';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import { MapPin } from 'lucide-react';

import Logo from '@/assets/images/logo-sekar.png';

import Columns from '@/components/common/Columns';
import Picture, { BaseItemProps } from '@/components/common/Picture';
import Button, { BaseAnchorProps } from '@/components/common/Button';
import Container from '@/components/common/Container';
import FooterSub, { FooterSubProps } from '@/components/layout/Footer/FooterSub';
import FooterFloat, { FooterFloatProps } from '@/components/layout/Footer/FooterFloat';

export type FooterProps = {
    location?: {
        link?: Pick<BaseAnchorProps, 'href' | 'target'>;
        title?: React.ReactNode;
        description?: React.ReactNode;
    };
    floatButton?: FooterFloatProps;
} & Partial<Record<'generalInfo' | 'socials', NonNullable<FooterSubProps['list']>['items']>>;

const Footer = ({ location, generalInfo, socials, floatButton }: FooterProps): React.ReactElement => {
    const hasContent = location || generalInfo || socials;

    let logoClass: ArrayStringProps = ['text-center'];
    if (hasContent) logoClass.push('mt-5');
    logoClass = joinArrayString(logoClass);

    return (
        <>
            {floatButton && <FooterFloat {...floatButton} />}

            <footer className="footer bg-sekar-accent py-6">
                <Container>
                    {hasContent && (
                        <Columns
                            className="max-md:text-center justify-between"
                            gutterY={3}>
                            <Columns.Column
                                md={4}
                                lg={5}
                                xl={4}>
                                {location?.link && (
                                    <FooterSub title="Location">
                                        <div className="mt-1 md:mt-1.5">
                                            <Button
                                                as="anchor"
                                                {...location.link}>
                                                <div className="flex max-md:justify-center gap-x-0.5">
                                                    <MapPin
                                                        size={14}
                                                        className="shrink-0 mt-0.5"
                                                    />
                                                    {location?.title && <strong>{location?.title}</strong>}
                                                </div>

                                                {location?.description && (
                                                    <p className="text-md leading-1.75">{location.description}</p>
                                                )}
                                            </Button>
                                        </div>
                                    </FooterSub>
                                )}
                            </Columns.Column>

                            <Columns.Column
                                md={4}
                                lg={'auto'}
                                xl={3}>
                                {socials && socials.length > 0 && (
                                    <FooterSub
                                        title="Connect With Us"
                                        list={{
                                            type: 'inline',
                                            items: socials,
                                        }}
                                    />
                                )}
                            </Columns.Column>

                            <Columns.Column
                                md={4}
                                lg={'auto'}
                                xl={3}>
                                {generalInfo && generalInfo.length > 0 && (
                                    <FooterSub
                                        title="General Info"
                                        list={{ items: generalInfo }}
                                    />
                                )}
                            </Columns.Column>
                        </Columns>
                    )}

                    <div className={logoClass}>
                        <Picture
                            className="inline-block"
                            imageClassName="max-w-[18rem]"
                            items={[Logo as BaseItemProps]}
                        />
                    </div>
                </Container>
            </footer>
        </>
    );
};

export default Footer;
