import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    as: { control: "text" },
    p: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "section", 0] },
    m: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "section", "auto", 0] },
    bg: { control: "color" },
    border: { control: "color" },
    rounded: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "xxl", "pill", "full"] },
    shadow: { control: "select", options: ["none", "sm", "md", "lg"] },
    display: { control: "select", options: ["block", "inline", "inline-block", "flex", "inline-flex", "grid", "inline-grid", "none"] },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    p: "lg",
    bg: "#f0f0f0",
    children: "Box with padding and background",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    p: "xl",
    bg: "#e8f4fd",
    rounded: "md",
    children: "This box renders as a <section> element",
  },
};

export const AsArticle: Story = {
  args: {
    as: "article",
    p: "lg",
    bg: "#fff3e0",
    rounded: "lg",
    children: "This box renders as an <article> element",
  },
};

export const WithMarginPadding: Story = {
  render: () => (
    <div style={{ background: "#f5f5f5", padding: 16 }}>
      <Box p="lg" mb="md" bg="#bbdefb" rounded="sm">
        padding lg, margin-bottom md
      </Box>
      <Box px="xl" py="sm" bg="#c8e6c9" rounded="sm">
        padding-x xl, padding-y sm
      </Box>
      <Box pt="xxl" pb="md" pl="lg" pr="xs" bg="#ffe0b2" rounded="sm">
        individual padding per side
      </Box>
    </div>
  ),
};

export const WithBorderAndRounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Box p="md" border="#333" rounded="sm">
        Border + rounded sm
      </Box>
      <Box p="md" border="#666" rounded="lg">
        Border + rounded lg
      </Box>
      <Box p="md" border="#999" rounded="full">
        Border + rounded full
      </Box>
      <Box p="md" border="#333" rounded="pill">
        Border + rounded pill
      </Box>
    </div>
  ),
};

export const WithShadow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Box p="lg" bg="white" rounded="md" shadow="sm">
        Shadow sm
      </Box>
      <Box p="lg" bg="white" rounded="md" shadow="md">
        Shadow md
      </Box>
      <Box p="lg" bg="white" rounded="md" shadow="lg">
        Shadow lg
      </Box>
    </div>
  ),
};

export const FlexDisplay: Story = {
  args: {
    display: "flex",
    p: "md",
    bg: "#e3f2fd",
    rounded: "md",
    children: (
      <>
        <Box p="sm" bg="#90caf9" rounded="sm">Item 1</Box>
        <Box p="sm" bg="#90caf9" rounded="sm">Item 2</Box>
        <Box p="sm" bg="#90caf9" rounded="sm">Item 3</Box>
      </>
    ),
  },
};
