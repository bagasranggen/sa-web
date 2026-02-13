import { PageDataProps } from '@/libs/@types';
import { createPicsumImage } from '@/libs/factory';

import parse from 'html-react-parser';

import { HomepageIndexProps } from '@/components/pages/HomepageIndex/index';

export const HomepageData = async (): Promise<PageDataProps<HomepageIndexProps>> => {
    const banner: HomepageIndexProps['entries']['banner'] = {
        media: [
            {
                link: {
                    href: '#',
                },
                items: [createPicsumImage({ width: 800, height: 600 })],
            },
            {
                link: {
                    href: '#',
                },
                items: [createPicsumImage({ id: 222, width: 800, height: 600 })],
            },
            // {
            //     link: {
            //         href: '#',
            //     },
            //     items: [createPicsumImage({ id: 400, width: 800, height: 600 })],
            // },
            // {
            //     link: {
            //         href: '#',
            //     },
            //     items: [createPicsumImage({ id: 444, width: 800, height: 600 })],
            // },
        ],
        description: parse(
            `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur corporis culpa eveniet, nobis perspiciatis rem!</p>`
        ),
        children: parse(` Lorem ipsum dolor sit amet, consectetur adipisicing elit.`),
    };

    return {
        entries: {
            banner,
        },
    };
};
