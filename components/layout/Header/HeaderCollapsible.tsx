import React, { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleContentProps,
    CollapsibleTrigger,
} from '@/components/shadcn/Collapsible';
import Button from '@/components/common/Button';
import { HeaderLinkProps } from '@/components/layout/Header/HeaderLink';

export type HeaderCollapsibleProps = Pick<HeaderLinkProps, 'link'> & Pick<CollapsibleContentProps, 'children'>;

const HeaderCollapsible = ({ link, children }: HeaderCollapsibleProps): React.ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Collapsible open={isOpen}>
            <div className="flex items-center justify-center">
                <Button
                    as="anchor"
                    className="nav__link"
                    {...link}
                />
                <CollapsibleTrigger
                    className="group"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        setIsOpen((prevState) => !prevState);
                    }}>
                    <ChevronDown className="ms-0.75 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up text-center">
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default HeaderCollapsible;
