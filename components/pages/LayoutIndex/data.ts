import { Footer, Navigation } from '@/libs/@types';
import { createLinkItem } from '@/libs/factory';

import { apolloClient } from '@/libs/fetchers';
import { GLOBAL_QUERY } from '@/graphql';

import { HeaderProps } from '@/components/layout/Header';
import { FooterProps } from '@/components/layout/Footer';

export const LayoutData = async () => {
    let data: any | undefined = undefined;

    try {
        const { data: d } = await apolloClient().query({
            query: GLOBAL_QUERY,
        });

        if (d) data = d;
    } catch {}

    const headerNavigation = data?.Navigation?.navigations;
    const footerNavigation = data?.Footer;

    const header: HeaderProps['items'] = [];

    if (headerNavigation && headerNavigation.length > 0) {
        headerNavigation.forEach((item: NonNullable<Navigation['navigations']>[number]) => {
            let tmp: NonNullable<HeaderProps['items']>[number] | undefined = undefined;

            const { linkIsValid, link } = createLinkItem(item?.link);

            if (!linkIsValid) return;

            if (link) tmp = Object.assign(tmp ?? {}, { link: link });

            if (item?.children && item.children.length > 0) {
                const tmpChild: NonNullable<HeaderProps['items']>[number]['child'] = [];

                item.children.forEach(
                    (child: NonNullable<NonNullable<Navigation['navigations']>[number]['children']>[number]) => {
                        const { linkIsValid, link } = createLinkItem(child?.link);

                        if (!linkIsValid) return;

                        if (link) tmpChild.push({ link });
                    }
                );

                if (tmpChild.length > 0) tmp = Object.assign(tmp ?? {}, { child: tmpChild } as any);
            }

            if (tmp) header.push(tmp);
        });
    }

    let footer: FooterProps | undefined = undefined;

    if (footerNavigation?.generalInfo && footerNavigation.generalInfo.length > 0) {
        const tmp: FooterProps['generalInfo'] = [];

        footerNavigation.generalInfo.forEach((item: NonNullable<Footer['generalInfo']>[number]) => {
            const { linkIsValid, link } = createLinkItem(item?.link);

            if (linkIsValid && link) tmp.push(link);
        });

        if (tmp.length > 0) footer = Object.assign(footer ?? {}, { generalInfo: tmp });
    }

    if (footerNavigation?.socials && footerNavigation.socials.length > 0) {
        const tmp: FooterProps['socials'] = [];

        footerNavigation.socials.forEach((item: NonNullable<Footer['generalInfo']>[number]) => {
            const { linkIsValid, link } = createLinkItem(item?.link);

            if (linkIsValid && link) tmp.push(link);
        });

        if (tmp.length > 0) footer = Object.assign(footer ?? {}, { socials: tmp });
    }

    let tmpLocation: FooterProps['location'] = undefined;
    if (footerNavigation?.locationLink) {
        const { linkIsValid, link } = createLinkItem(footerNavigation.locationLink);

        if (linkIsValid && link) {
            tmpLocation = Object.assign(tmpLocation ?? {}, { link });
        }
        if (footerNavigation?.locationTitle) {
            tmpLocation = Object.assign(tmpLocation ?? {}, { title: footerNavigation.locationTitle });
        }
        if (footerNavigation?.locationAddress) {
            tmpLocation = Object.assign(tmpLocation ?? {}, { description: footerNavigation.locationAddress });
        }
    }

    if (tmpLocation) footer = Object.assign(footer ?? {}, { location: tmpLocation });

    return {
        header,
        footer,
    };
};
