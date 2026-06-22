import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { expect, fn } from 'storybook/test';

import InputDayPicker from './InputDayPicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Input/Shared',
    component: InputDayPicker,
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
} satisfies Meta<typeof InputDayPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DayPickerSingle: Story = {
    // parameters: {},
    args: {
        // placeholder: 'Placeholder',
        calendar: {
            mode: 'single',
        },
        hidden: false,
    },
};

export const DayPickerRange: Story = {
    // parameters: {},
    args: {
        // placeholder: 'Placeholder',
        calendar: {
            mode: 'range',
            min: 1,
            max: 2,
        },
        hidden: false,
    },
};
