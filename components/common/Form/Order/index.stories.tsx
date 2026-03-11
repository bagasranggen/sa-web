import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { expect, fn } from 'storybook/test';

import { ORDER_COLLECTION } from '@/libs/mock';
import { DELIVERY_ADDRESS_PICKUP } from '@/libs/constants';

import Order from './index';
import Container from '@/components/common/Container';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Form/Order',
    component: Order,
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
        // hidden: { control: 'boolean' },
        // required: { control: 'boolean' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    // args: { onClick: fn() },
} satisfies Meta<typeof Order>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    // parameters: {},
    args: {
        onFormSubmit: (data) => {
            console.log({ data });
        },
        collection: ORDER_COLLECTION,
        pickupAddress: DELIVERY_ADDRESS_PICKUP,
    },
};
