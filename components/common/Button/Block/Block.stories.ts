import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { expect, fn } from 'storybook/test';

import Block from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Button/Block',
    component: Block,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        as: {
            control: 'select',
            options: ['anchor', 'button'],
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: { onClick: fn() },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    // parameters: {},
    args: {
        as: 'button',
        // as: 'anchor',
        // href: '#',
        size: 'md',
        children: 'Button',
    },
    play: async ({ canvas, userEvent, args }) => {
        const button = canvas.getByRole('button');

        await userEvent.click(button);

        await expect(args.onClick).toHaveBeenCalled();
    },
};

export const Large: Story = {
    args: {
        as: 'button',
        size: 'lg',
        children: 'Button',
    },
};
