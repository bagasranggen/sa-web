import React from 'react';

import { useNavigationStateContext } from '@/store/context';

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
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <>
            <DropdownMenu
                modal={false}
                open={isOpen && activeDropdown === link.children}>
                <Button
                    as="anchor"
                    href={link.href}
                    target={link.target}
                    className="nav__link flex items-center">
                    {link.children}
                    <DropdownMenuTrigger
                        asChild
                        className="group"
                        // onClick={(e: any) => {
                        // setIsOpen((prevState) => !prevState);
                        // if (trigger?.onClick) trigger.onClick(e, children);
                        // }}
                    >
                        <ChevronDown className="ms-0.75 transition-transform group-aria-expanded:rotate-180" />
                    </DropdownMenuTrigger>
                </Button>

                <DropdownMenuContent
                    align="end"
                    className="px-2 py-1 bg-sekar-accent border-sekar-accent"
                    // onInteractOutside={() => {
                    //     setTimeout(() => {
                    //         if (isOpen) setIsOpen(false);
                    //     }, 150);
                    // }}
                >
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default HeaderDropdown;
