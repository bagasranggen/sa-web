import React, { Suspense } from 'react';

import { useNavigationStateContext } from '@/store/context';
import { NavigationEvents, useCheckSamePath } from '@/libs/hooks';

import { ChevronDown } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuProps,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/shadcn/DropdownMenu';
import Button from '@/components/common/Button';
import { HeaderLinkProps } from '@/components/layout/Header/HeaderLink';

export type HeaderDropdownProps = Pick<HeaderLinkProps, 'link'> & Pick<DropdownMenuProps, 'children'>;

const HeaderDropdown = ({ link, children }: HeaderDropdownProps): React.ReactElement => {
    const { activeDropdown, setActiveDropdown } = useNavigationStateContext();
    const { isSamePath } = useCheckSamePath();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <>
            <Suspense fallback={null}>
                <NavigationEvents
                    endHandler={() => {
                        setActiveDropdown(undefined);
                        setIsOpen(false);
                    }}
                />
            </Suspense>

            <DropdownMenu
                modal={false}
                open={isOpen && activeDropdown === link.children}>
                <Button
                    as="anchor"
                    href={link.href}
                    target={link.target}
                    className="nav__link flex items-center"
                    onClick={() => {
                        if (isSamePath({ href: link.href })) {
                            setActiveDropdown(undefined);
                            setIsOpen(false);
                        }
                    }}>
                    {link.children}
                    <DropdownMenuTrigger
                        asChild
                        className="group"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setActiveDropdown(link.children);
                            setIsOpen((prevState) => {
                                if (prevState && !activeDropdown) return true;

                                return !prevState;
                            });
                        }}>
                        <ChevronDown className="ms-0.75 transition-transform group-aria-expanded:rotate-180" />
                    </DropdownMenuTrigger>
                </Button>

                <DropdownMenuContent
                    align="end"
                    className="px-2 py-1 bg-sekar-accent border-sekar-accent"
                    onInteractOutside={() => {
                        setTimeout(() => {
                            if (isOpen) setIsOpen(false);
                        }, 150);
                    }}>
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default HeaderDropdown;
