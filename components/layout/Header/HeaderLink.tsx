import React from 'react';

import Button, { BaseAnchorProps } from '@/components/common/Button';
import HeaderCollapsible from '@/components/layout/Header/HeaderCollapsible';
import HeaderDropdown from '@/components/layout/Header/HeaderDropdown';

export type HeaderLinkItemProps = Pick<BaseAnchorProps, 'href' | 'target' | 'children'>;

export type HeaderLinkProps = {
    multiSelectType?: 'collapsible' | 'dropdown';
    link: HeaderLinkItemProps;
    child?: HeaderLinkProps[];
};

const HeaderLink = ({ multiSelectType = 'dropdown', link, child }: HeaderLinkProps): React.ReactElement => {
    if (link && link?.href && child && child.length > 0) {
        const links: React.ReactElement[] = [];

        child.forEach((item) => {
            links.push(
                <HeaderLink
                    multiSelectType={multiSelectType}
                    link={item.link}
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
