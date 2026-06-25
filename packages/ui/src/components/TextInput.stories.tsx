import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Must be 3-20 characters, letters and numbers only.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address.',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    success: 'Email is available!',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    rightIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    leftIcon: <span className="text-sm">$</span>,
    rightIcon: <span className="text-sm">USD</span>,
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small input',
    placeholder: 'Small',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large input',
    placeholder: 'Large',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <TextInput label="Small" placeholder="sm" size="sm" />
      <TextInput label="Medium" placeholder="md" size="md" />
      <TextInput label="Large" placeholder="lg" size="lg" />
    </div>
  ),
};
