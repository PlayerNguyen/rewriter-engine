import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import '../src/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark-canvas',
      values: [
        { name: 'dark-canvas', value: '#010102' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
