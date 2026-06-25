import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
    offset: { control: 'number' },
    disabled: { control: 'boolean' },
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerButton = ({ children }: { children: string }) => (
  <button className="px-4 py-2 text-sm bg-blue-100 border border-blue-300 rounded hover:bg-blue-200 transition-colors">
    {children}
  </button>
);

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <TriggerButton>Hover me</TriggerButton>,
  },
};

export const PlacementTop: Story = {
  args: {
    content: 'Tooltip on top',
    placement: 'top',
    children: <TriggerButton>Top</TriggerButton>,
  },
};

export const PlacementBottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    placement: 'bottom',
    children: <TriggerButton>Bottom</TriggerButton>,
  },
};

export const PlacementLeft: Story = {
  args: {
    content: 'Tooltip on left',
    placement: 'left',
    children: <TriggerButton>Left</TriggerButton>,
  },
};

export const PlacementRight: Story = {
  args: {
    content: 'Tooltip on right',
    placement: 'right',
    children: <TriggerButton>Right</TriggerButton>,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-16 py-12">
      <Tooltip content="Top tooltip" placement="top">
        <TriggerButton>Top</TriggerButton>
      </Tooltip>
      <div className="flex gap-24">
        <Tooltip content="Left tooltip" placement="left">
          <TriggerButton>Left</TriggerButton>
        </Tooltip>
        <Tooltip content="Right tooltip" placement="right">
          <TriggerButton>Right</TriggerButton>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <TriggerButton>Bottom</TriggerButton>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'Appears after 1 second',
    delay: 1000,
    children: <TriggerButton>Slow tooltip (1s delay)</TriggerButton>,
  },
};

export const NoDelay: Story = {
  args: {
    content: 'Appears instantly',
    delay: 0,
    children: <TriggerButton>Instant tooltip</TriggerButton>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'You should not see this',
    disabled: true,
    children: <TriggerButton>Disabled tooltip</TriggerButton>,
  },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a tooltip with a much longer content that demonstrates how the component handles multi-line text.',
    placement: 'top',
    children: <TriggerButton>Long tooltip</TriggerButton>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <p className="font-semibold">Rich Tooltip</p>
        <p className="text-xs opacity-80">With formatted content</p>
      </div>
    ),
    placement: 'top',
    children: <TriggerButton>Rich content</TriggerButton>,
  },
};
