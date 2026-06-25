import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Media/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
    decorative: { control: 'boolean' },
    label: { control: 'text' },
    spin: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const HeartSvg = () => (
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
);

const StarSvg = () => (
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
);

const SettingsSvg = () => (
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>
);

export const Default: Story = {
  args: {
    children: <HeartSvg />,
    label: 'Heart',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="text-center">
          <Icon size={size} label={`Heart ${size}`}>
            <HeartSvg />
          </Icon>
          <p className="text-xs mt-1 text-gray-500">{size}</p>
        </div>
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    children: <StarSvg />,
    size: 'lg',
    label: 'Favorite',
  },
};

export const Decorative: Story = {
  args: {
    children: <HeartSvg />,
    size: 'md',
    decorative: true,
  },
};

export const Spinning: Story = {
  args: {
    children: <SettingsSvg />,
    size: 'lg',
    spin: true,
    label: 'Loading',
  },
};

export const CustomColor: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon color="#ef4444" size="lg" label="Red heart">
        <HeartSvg />
      </Icon>
      <Icon color="#22c55e" size="lg" label="Green heart">
        <HeartSvg />
      </Icon>
      <Icon color="#3b82f6" size="lg" label="Blue heart">
        <HeartSvg />
      </Icon>
      <Icon color="#f59e0b" size="lg" label="Yellow heart">
        <HeartSvg />
      </Icon>
    </div>
  ),
};

export const MultipleIcons: Story = {
  render: () => (
    <div className="flex gap-6">
      <Icon size="lg" label="Heart">
        <HeartSvg />
      </Icon>
      <Icon size="lg" label="Star">
        <StarSvg />
      </Icon>
      <Icon size="lg" label="Settings">
        <SettingsSvg />
      </Icon>
    </div>
  ),
};
