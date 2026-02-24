'use client';

import React, { Ref, Suspense, useEffect, useState } from 'react';

import { NAVIGATION_LINKS } from '@/libs/mock';
import { useLayoutStateContext } from '@/store/context';
import { NavigationEvents, useCheckSamePath } from '@/libs/hooks';

import { useMeasure } from 'react-use';

import LogoText from '@/assets/images/logo-sekar-text.png';

import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Picture, { BaseItemProps } from '@/components/common/Picture';
import Icon from '@/components/common/Icon';
import HeaderModal from '@/components/layout/Header/HeaderModal';
import HeaderLink, { HeaderLinkProps } from '@/components/layout/Header/HeaderLink';

export type HeaderProps = {
    items?: HeaderLinkProps[];
};

const Header = ({ items }: HeaderProps): React.ReactElement => {
    const { setHeaderHeight } = useLayoutStateContext();
    const { isSamePath } = useCheckSamePath();
    const [headerRef, { height }] = useMeasure();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (height === 0) return;

        setHeaderHeight(height);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height]);

    return (
        <>
            <Suspense fallback={null}>
                <NavigationEvents
                    endHandler={() => {
                        setIsOpen(false);
                    }}
                />
            </Suspense>

            <nav
                ref={headerRef as Ref<HTMLDivElement>}
                className="nav">
                <Container className="nav__container">
                    <Button
                        as="anchor"
                        href="/">
                        <Picture
                            imageClassName="max-w-[18rem]"
                            items={[LogoText as BaseItemProps]}
                        />
                    </Button>

                    <Button
                        as="button"
                        className="lg:hidden"
                        onClick={() => setIsOpen((prevState) => !prevState)}>
                        <Icon.Hamburger active={isOpen} />
                    </Button>

                    {items && items.length > 0 && (
                        <div className="nav__links">
                            {items.map((item, i) => {
                                return (
                                    <HeaderLink
                                        key={i}
                                        multiSelectType="dropdown"
                                        link={item.link}
                                        child={item.child}
                                    />
                                );
                            })}
                        </div>
                    )}
                </Container>
            </nav>

            {items && items.length > 0 && (
                <HeaderModal
                    open={isOpen}
                    onClose={() => setIsOpen(false)}>
                    <Container className="mt-4 flex flex-col items-center gap-y-1">
                        {items.map((item, i) => {
                            return (
                                <HeaderLink
                                    key={i}
                                    multiSelectType="collapsible"
                                    link={{
                                        ...item.link,
                                        onClick: () => {
                                            setIsOpen(false);
                                        },
                                    }}
                                    child={item.child}
                                />
                            );
                        })}
                    </Container>
                </HeaderModal>
            )}
        </>
    );
};

export default Header;
