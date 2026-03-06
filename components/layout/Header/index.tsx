'use client';

import React, { Ref, Suspense, useEffect, useMemo, useRef } from 'react';

import { useLayoutStateContext, useNavigationStateContext } from '@/store/context';
import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { NavigationEvents, useCheckSamePath } from '@/libs/hooks';

import { useMeasure, useWindowScroll, useWindowSize } from 'react-use';

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
    const { navigationModalIsOpen, setNavigationModalIsOpen, activeDropdown, setActiveDropdown } =
        useNavigationStateContext();
    const { isSamePath } = useCheckSamePath();
    const [headerRef, { height }] = useMeasure();
    const currentScroll = useRef<number>(0);
    const { y } = useWindowScroll();
    const { width } = useWindowSize();

    const isMobile = useMemo(() => {
        let data = false;

        if (width < 992) data = true;

        return data;
    }, [width]);

    const isNavHide = useMemo(() => {
        let data = false;

        if (y > height && currentScroll.current < y) data = true;
        currentScroll.current = y;

        return data;
    }, [y, height]);

    let navClass: ArrayStringProps = ['nav'];
    if (isNavHide) navClass.push('nav--hide');
    navClass = joinArrayString(navClass);

    useEffect(() => {
        if (!isMobile && navigationModalIsOpen) setNavigationModalIsOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, navigationModalIsOpen]);

    useEffect(() => {
        if (height === 0) return;

        setHeaderHeight(height);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height]);

    useEffect(() => {
        if (!activeDropdown) return;
        if (!isNavHide) return;

        setActiveDropdown(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNavHide, activeDropdown]);

    return (
        <>
            <Suspense fallback={null}>
                <NavigationEvents
                    endHandler={() => {
                        setNavigationModalIsOpen(false);
                    }}
                />
            </Suspense>

            <nav
                ref={headerRef as Ref<HTMLDivElement>}
                className={navClass}>
                <Container className="nav__container">
                    <Button
                        as="anchor"
                        href="/">
                        <Picture
                            imageClassName="max-w-[18rem]"
                            items={[LogoText as BaseItemProps]}
                        />
                    </Button>

                    {items && items.length > 0 && (
                        <Button
                            as="button"
                            className="lg:hidden"
                            onClick={() => setNavigationModalIsOpen((prevState) => !prevState)}>
                            <Icon.Hamburger active={navigationModalIsOpen} />
                        </Button>
                    )}

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
                    open={navigationModalIsOpen}
                    onClose={() => setNavigationModalIsOpen(false)}>
                    <Container className="mt-4 flex flex-col items-center gap-y-1">
                        {items.map((item, i) => {
                            return (
                                <HeaderLink
                                    key={i}
                                    multiSelectType="collapsible"
                                    link={{
                                        ...item.link,
                                        onClick: () => {
                                            if (isSamePath({ href: item.link.href })) {
                                                setNavigationModalIsOpen(false);
                                            }
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
