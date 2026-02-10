import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

// Wrapper component to provide theme context
const ThemeWrapper = ({ children, isDarkMode = false }) => {
  const [theme, setTheme] = React.useState({ isDarkMode, toggleTheme: () => setTheme(prev => ({ ...prev, isDarkMode: !prev.isDarkMode })) });
  
  return (
    <ThemeProvider value={theme}>
      <div style={{ padding: '20px', backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', minHeight: '100px' }}>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, { args }) => (
      <ThemeWrapper isDarkMode={args.isDarkMode}>
        <Story />
      </ThemeWrapper>
    ),
  ],
  argTypes: {
    isDarkMode: {
      control: 'boolean',
      description: 'Whether dark mode is currently active',
    },
  },
};

export const LightMode = {
  args: {
    isDarkMode: false,
  },
};

export const DarkMode = {
  args: {
    isDarkMode: true,
  },
};

export const Interactive = {
  args: {
    isDarkMode: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the toggle to switch between light and dark modes.',
      },
    },
  },
};
