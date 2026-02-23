import { HeaderLinkProps } from '@/components/layout/Header/HeaderLink';

export const NAVIGATION_LINKS: HeaderLinkProps[] = [
    {
        link: {
            href: '/collection',
            children: 'Collection',
        },
    },
    {
        link: {
            href: '/collection',
            children: 'Collection',
        },
        child: [
            {
                link: {
                    href: '/collection/formal',
                    children: 'Party',
                },
            },
            {
                link: {
                    href: '/collection/formal',
                    children: 'Hijab Friendly',
                },
            },
        ],
    },
    {
        link: {
            href: '/collection',
            children: 'Collection',
        },
    },
];
