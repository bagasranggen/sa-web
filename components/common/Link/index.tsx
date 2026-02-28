import React, { forwardRef } from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & NextLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ className, href, ...rest }, ref) => {
    let linkClass: ArrayStringProps = [];
    if (className) linkClass.push(className);
    linkClass = joinArrayString(linkClass);

    const hrefReplacer = (href: NextLinkProps['href']) => {
        const replaceHref = process.env.NEXT_PUBLIC_LINK_REPLACE?.split(',');

        let hrefUpdate: NextLinkProps['href'] = href;
        if (typeof href === 'string' && replaceHref && replaceHref.length > 1 && href.includes(replaceHref[0])) {
            hrefUpdate = href.replace(replaceHref[0], replaceHref[1]);
        }

        return hrefUpdate;
    };

    return (
        <NextLink
            ref={ref}
            className={linkClass}
            href={hrefReplacer(href)}
            {...rest}
        />
    );
});

Link.displayName = 'Link';
export default Link;
