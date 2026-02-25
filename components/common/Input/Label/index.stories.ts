import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { expect, fn } from 'storybook/test';

import Label from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Input/Label',
    component: Label,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        hidden: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: { onClick: fn() },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    // parameters: {},
    args: {
        type: 'text',
        id: 'test',
        label: 'Label',
        hidden: false,
        required: false,
    },
};

export const Error: Story = {
    // parameters: {},
    args: {
        type: 'text',
        id: 'test',
        label: 'Label',
        error: 'Error message',
    },
};

export const Textarea: Story = {
    // parameters: {},
    args: {
        type: 'textarea',
        id: 'test',
        label: 'Label',
    },
};

export const Select: Story = {
    // parameters: {},
    args: {
        type: 'select',
        id: 'test',
        label: 'Label',
        items: [
            { value: '', label: '-- Please Select --' },
            { value: '1', label: 'Option 1' },
        ],
    },
};
export const SelectMultiple: Story = {
    // parameters: {},
    args: {
        type: 'select',
        id: 'test',
        label: 'Label',
        multiple: true,
        items: [
            { value: '', label: '-- Please Select --' },
            { value: '1', label: 'Option 1' },
        ],
    },
};
