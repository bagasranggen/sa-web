import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// import { fn } from 'storybook/test';

import { CAROUSEL_MEDIA_LIGHTBOX, CAROUSEL_MEDIA_PREVIEW, CAROUSEL_MEDIA_THUMB } from '@/libs/mock';

import Thumbnail from './index';
import Container from '@/components/common/Container';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Carousel/Thumbnail',
    component: Thumbnail,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '100vw' }}>
                <Container className="my-5">
                    <Story />
                </Container>
            </div>
        ),
    ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    // args: { onClick: fn() },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        thumbnail: CAROUSEL_MEDIA_THUMB,
        media: CAROUSEL_MEDIA_PREVIEW,
        lightbox: CAROUSEL_MEDIA_LIGHTBOX,
    },
};
