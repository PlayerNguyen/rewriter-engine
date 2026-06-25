import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["horizontal", "vertical"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    gap: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] },
    wrap: { control: "boolean" },
    inline: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Item = ({ children }: { children: string }) => (
  <div className="bg-blue-100 border border-blue-300 rounded px-4 py-2 text-sm">{children}</div>
);

export const Vertical: Story = {
  args: {
    direction: "vertical",
    gap: "md",
    children: (
      <>
        <Item>First</Item>
        <Item>Second</Item>
        <Item>Third</Item>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    gap: "md",
    children: (
      <>
        <Item>First</Item>
        <Item>Second</Item>
        <Item>Third</Item>
      </>
    ),
  },
};

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-6">
      {(["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as const).map((gap) => (
        <div key={gap}>
          <p className="text-xs text-gray-500 mb-1">gap: {gap}</p>
          <Stack direction="horizontal" gap={gap}>
            <Item>A</Item>
            <Item>B</Item>
            <Item>C</Item>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const WithDivider: Story = {
  args: {
    direction: "horizontal",
    gap: "md",
    divider: <span className="text-gray-300">|</span>,
    children: (
      <>
        <Item>Home</Item>
        <Item>About</Item>
        <Item>Contact</Item>
      </>
    ),
  },
};

export const VerticalWithDivider: Story = {
  args: {
    direction: "vertical",
    gap: "sm",
    divider: <hr className="border-gray-200" />,
    children: (
      <>
        <Item>Section 1</Item>
        <Item>Section 2</Item>
        <Item>Section 3</Item>
      </>
    ),
  },
};

export const JustifyBetween: Story = {
  args: {
    direction: "horizontal",
    justify: "between",
    gap: "md",
    children: (
      <>
        <Item>Left</Item>
        <Item>Right</Item>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    direction: "vertical",
    align: "center",
    gap: "sm",
    children: (
      <>
        <Item>Centered</Item>
        <Item>Content</Item>
      </>
    ),
  },
};

export const Wrapped: Story = {
  args: {
    direction: "horizontal",
    gap: "sm",
    wrap: true,
    children: (
      <>
        <Item>Tag 1</Item>
        <Item>Tag 2</Item>
        <Item>Tag 3</Item>
        <Item>Tag 4</Item>
        <Item>Tag 5</Item>
        <Item>Tag 6</Item>
        <Item>Tag 7</Item>
        <Item>Tag 8</Item>
      </>
    ),
  },
};
