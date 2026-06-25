import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: [
        "display-xl", "display-lg", "display-md", "headline", "card-title",
        "subhead", "body-lg", "body", "body-sm", "caption", "button", "eyebrow", "mono",
      ],
    },
    weight: { control: "select", options: [400, 500, 600, 700] },
    color: { control: "select", options: ["ink", "ink-muted", "ink-subtle", "ink-tertiary", "primary", "inverse-ink", "inherit"] },
    align: { control: "select", options: ["left", "center", "right", "justify"] },
    truncate: { control: "boolean" },
    italic: { control: "boolean" },
    underline: { control: "boolean" },
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label", "blockquote", "code"] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: "body",
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

export const DisplayXL: Story = {
  args: { size: "display-xl", children: "Display XL" },
};

export const DisplayLG: Story = {
  args: { size: "display-lg", children: "Display LG" },
};

export const DisplayMD: Story = {
  args: { size: "display-md", children: "Display MD" },
};

export const Headline: Story = {
  args: { size: "headline", children: "Headline Text" },
};

export const CardTitle: Story = {
  args: { size: "card-title", children: "Card Title" },
};

export const Subhead: Story = {
  args: { size: "subhead", children: "Subheading text" },
};

export const BodyLG: Story = {
  args: { size: "body-lg", children: "Large body text for emphasis." },
};

export const Body: Story = {
  args: { size: "body", children: "Standard body text for paragraphs and general content." },
};

export const BodySM: Story = {
  args: { size: "body-sm", children: "Small body text for secondary information." },
};

export const Caption: Story = {
  args: { size: "caption", children: "Caption text for labels and metadata." },
};

export const Button: Story = {
  args: { size: "button", children: "Button Text" },
};

export const Eyebrow: Story = {
  args: { size: "eyebrow", children: "EYEBROW LABEL" },
};

export const Mono: Story = {
  args: { size: "mono", children: "const x = 42;" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="display-xl">Display XL</Text>
      <Text size="display-lg">Display LG</Text>
      <Text size="display-md">Display MD</Text>
      <Text size="headline">Headline</Text>
      <Text size="card-title">Card Title</Text>
      <Text size="subhead">Subhead</Text>
      <Text size="body-lg">Body LG</Text>
      <Text size="body">Body</Text>
      <Text size="body-sm">Body SM</Text>
      <Text size="caption">Caption</Text>
      <Text size="button">Button</Text>
      <Text size="eyebrow">EYEBROW</Text>
      <Text size="mono">mono code</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="ink">ink (default)</Text>
      <Text color="ink-muted">ink-muted</Text>
      <Text color="ink-subtle">ink-subtle</Text>
      <Text color="ink-tertiary">ink-tertiary</Text>
      <Text color="primary">primary</Text>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children: "This is a very long text that should be truncated with an ellipsis when it reaches the container boundary. It keeps going and going and going.",
    style: { width: 300 },
  },
};

export const LineClamp: Story = {
  args: {
    truncate: 2,
    children: "This text is clamped to two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    style: { width: 300 },
  },
};

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="h1" size="headline">Rendered as h1</Text>
      <Text as="p" size="body">Rendered as p</Text>
      <Text as="span" size="caption">Rendered as span</Text>
      <Text as="label" size="body-sm">Rendered as label</Text>
      <Text as="code" size="mono">Rendered as code</Text>
    </div>
  ),
};

export const ItalicAndUnderline: Story = {
  render: () => (
    <div className="space-y-2">
      <Text italic>Italic text</Text>
      <Text underline>Underlined text</Text>
      <Text italic underline>Italic and underlined</Text>
    </div>
  ),
};
