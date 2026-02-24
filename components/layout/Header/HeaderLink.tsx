import React from 'react';

import { useNavigationStateContext } from '@/store/context';
import { useCheckSamePath } from '@/libs/hooks';

import Button, { BaseAnchorProps } from '@/components/common/Button';
import HeaderCollapsible from '@/components/layout/Header/HeaderCollapsible';
import HeaderDropdown from '@/components/layout/Header/HeaderDropdown';

export type HeaderLinkItemProps = Pick<BaseAnchorProps, 'href' | 'target' | 'children' | 'onClick'>;

export type HeaderLinkProps = {
    multiSelectType?: 'collapsible' | 'dropdown';
    link: HeaderLinkItemProps;
    child?: HeaderLinkProps[];
};

const HeaderLink = ({ multiSelectType = 'dropdown', link, child }: HeaderLinkProps): React.ReactElement => {
    const { setActiveDropdown, setNavigationModalIsOpen } = useNavigationStateContext();
    const { isSamePath } = useCheckSamePath();

    if (link && link?.href && child && child.length > 0) {
        const links: React.ReactElement[] = [];

        child.forEach((item, i) => {
            links.push(
                <HeaderLink
                    key={i}
                    multiSelectType={multiSelectType}
                    link={{
                        ...item.link,
                        onClick: () => {
                            if (multiSelectType === 'dropdown' && isSamePath({ href: item?.link?.href })) {
                                setActiveDropdown(undefined);
                            }

                            if (multiSelectType === 'collapsible' && isSamePath({ href: item?.link?.href })) {
                                setNavigationModalIsOpen(false);
                            }
                        },
                    }}
                />
            );
        });

        if (multiSelectType === 'dropdown')
            return (
                <HeaderDropdown link={link}>
                    <div className="flex flex-col gap-y-1">{links}</div>
                </HeaderDropdown>
            );

        if (multiSelectType === 'collapsible')
            return (
                <HeaderCollapsible link={link}>
                    <div className="flex flex-col items-center gap-y-1 mt-1">{links}</div>
                </HeaderCollapsible>
            );
    }

    return (
        <Button
            as="anchor"
            className="nav__link"
            {...link}
        />
    );
};

export default HeaderLink;
