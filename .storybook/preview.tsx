import type { Preview } from '@storybook/nextjs-vite';
import localFont from 'next/font/local';
import { Space_Grotesk } from 'next/font/google';

// import '../assets/styles/css/global.css';

const aboreto = localFont({
    src: '../assets/fonts/aboreto/Aboreto-Regular.ttf',
    variable: '--font-aboreto',
});

const spaceGrotesk = Space_Grotesk({
    variable: '--font-space-grotesk',
    subsets: ['latin'],
});

const preview: Preview = {
    decorators: [
        (Story) => (
            <main className={`${aboreto.variable} ${spaceGrotesk.variable}`}>
                <Story />
            </main>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
