import { PageDataProps } from '@/libs/@types';
import { createArrayFromNumber, createPicsumImage } from '@/libs/factory';

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

    const highlight: HomepageIndexProps['entries']['highlight'] = [
        {
            link: { href: '#' },
            label: 'New Release',
            description: parse(`
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem cumque
                    error eum eveniet labore laudantium maiores nesciunt quas ratione.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem cumque
                    error eum eveniet labore laudantium maiores nesciunt quas ratione.
                </p>
            `),
            children: 'Gema black - B026',
        },
        {
            link: { href: '#' },
            label: 'New Release',
            description: parse(`
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem cumque
                    error eum eveniet labore laudantium maiores nesciunt quas ratione.
                </p>
            `),
            children: 'Gema black - B026',
        },
    ];

    const collection: HomepageIndexProps['entries']['collection'] = [];

    createArrayFromNumber(8).forEach((_, i) => {
        collection.push({
            link: { href: '#' },
            media: [createPicsumImage({ id: 151 + i, width: 800, height: 800 })],
        });
    });

    return {
        entries: {
            banner,
            highlight,
            collection,
        },
    };
};
