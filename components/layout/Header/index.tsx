'use client';

import React, { Ref, Suspense, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useLayoutStateContext, useNavigationStateContext } from '@/store/context';
import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';
import { NavigationEvents, useCheckSamePath } from '@/libs/hooks';

import { useMeasure, useWindowScroll, useWindowSize } from 'react-use';
import { Search } from 'lucide-react';

import LogoText from '@/assets/images/logo-sekar-text.png';

import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Picture, { BaseItemProps } from '@/components/common/Picture';
import Icon from '@/components/common/Icon';
import HeaderModal from '@/components/layout/Header/HeaderModal';
import HeaderLink, { HeaderLinkProps } from '@/components/layout/Header/HeaderLink';
import HeaderSearch from '@/components/layout/Header/HeaderSearch';

export type HeaderProps = {
    items?: HeaderLinkProps[];
};

const Header = ({ items }: HeaderProps): React.ReactElement => {
    const { setHeaderHeight } = useLayoutStateContext();
    const {
        navigationModalIsOpen,
        setNavigationModalIsOpen,
        searchModalIsOpen,
        setSearchModalIsOpen,
        activeDropdown,
        setActiveDropdown,
    } = useNavigationStateContext();
    const { isSamePath } = useCheckSamePath();
    const router = useRouter();
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
                        setSearchModalIsOpen(false);
                    }}
                />
            </Suspense>

            <nav
                suppressHydrationWarning
                ref={headerRef as Ref<HTMLDivElement>}
                className={navClass}>
                <Container className="nav__container">
                    <Button
                        as="anchor"
                        href="/">
                        <Picture
                            imageClassName="max-w-[18rem]"
                            items={[LogoText as BaseItemProps]}
                            loading="eager"
                        />
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

                    <Button
                        as="button"
                        className="nav__search"
                        onClick={() => setSearchModalIsOpen(true)}>
                        <Search />
                    </Button>

                    {items && items.length > 0 && (
                        <Button
                            as="button"
                            className="lg:hidden"
                            onClick={() => setNavigationModalIsOpen((prevState) => !prevState)}>
                            <Icon.Hamburger active={navigationModalIsOpen} />
                        </Button>
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

            <HeaderSearch
                open={searchModalIsOpen}
                onOpenChange={setSearchModalIsOpen}
                form={{
                    onFormSubmit: (data) => {
                        if (data?.search) router.push(`/search?q=${data.search}`);
                        if (!data?.search) setSearchModalIsOpen(false);
                    },
                }}
            />
        </>
    );
};

export default Header;
