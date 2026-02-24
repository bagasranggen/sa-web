import { HeaderLinkProps } from '@/components/layout/Header/HeaderLink';

export const NAVIGATION_LINKS: HeaderLinkProps[] = [
    // {
    //     link: {
    //         href: '/collection',
    //         children: 'Collection',
    //     },
    // },
    {
        link: {
            href: '/collection',
            children: 'Collection',
        },
        child: [
            {
                link: {
                    href: '/collection/hijab-friendly',
                    children: 'Hijab Friendly',
                },
            },
            {
                link: {
                    href: '/collection/prom',
                    children: 'Prom',
                },
            },
            {
                link: {
                    href: '/collection/night-party',
                    children: 'Night Party',
                },
            },
            {
                link: {
                    href: '/collection/wedding-guest',
                    children: 'Wedding Guest',
                },
            },
        ],
    },
    {
        link: {
            href: '/terms-conditions',
            children: 'Terms & Conditions',
        },
    },
    // {
    //     link: {
    //         href: '/collection',
    //         children: 'Collection',
    //     },
    //     child: [
    //         {
    //             link: {
    //                 href: '/collection/formal',
    //                 children: 'Hijab Friendly',
    //             },
    //         },
    //     ],
    // },
];
