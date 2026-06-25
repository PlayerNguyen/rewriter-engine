import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Choose a fruit...',
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    options: fruitOptions,
    label: 'Favorite Fruit',
    helperText: 'Pick your favorite from the list.',
    placeholder: 'Select a fruit...',
  },
};

export const ErrorState: Story = {
  args: {
    options: fruitOptions,
    label: 'Fruit',
    error: 'This field is required.',
    placeholder: 'Select...',
  },
};

export const SuccessState: Story = {
  args: {
    options: fruitOptions,
    label: 'Fruit',
    success: 'Selection saved!',
    defaultValue: 'cherry',
  },
};

export const WithPreselectedValue: Story = {
  args: {
    options: fruitOptions,
    label: 'Fruit',
    defaultValue: 'cherry',
  },
};

export const Required: Story = {
  args: {
    options: fruitOptions,
    label: 'Fruit',
    required: true,
    placeholder: 'Select...',
  },
};

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    label: 'Fruit',
    disabled: true,
    defaultValue: 'banana',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana (out of stock)', disabled: true },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date (out of stock)', disabled: true },
    ],
    label: 'Available Fruits',
    placeholder: 'Select...',
  },
};

export const SmallSize: Story = {
  args: {
    options: fruitOptions,
    label: 'Small select',
    size: 'sm',
    placeholder: 'Select...',
  },
};

export const LargeSize: Story = {
  args: {
    options: fruitOptions,
    label: 'Large select',
    size: 'lg',
    placeholder: 'Select...',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Select options={fruitOptions} label="Small" size="sm" placeholder="sm" />
      <Select options={fruitOptions} label="Medium" size="md" placeholder="md" />
      <Select options={fruitOptions} label="Large" size="lg" placeholder="lg" />
    </div>
  ),
};
