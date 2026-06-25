import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Forms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    autoResize: { control: "boolean" },
    showCount: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    success: { control: "text" },
    placeholder: { control: "text" },
    maxLength: { control: "number" },
    rows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Write your message here...",
    rows: 4,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    maxLength: 200,
    showCount: true,
    rows: 3,
  },
};

export const AutoResize: Story = {
  args: {
    label: "Notes",
    placeholder: "Start typing and the field will grow...",
    autoResize: true,
    rows: 2,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Feedback",
    placeholder: "Your feedback...",
    error: "This field is required.",
    rows: 3,
  },
};

export const SuccessState: Story = {
  args: {
    label: "Description",
    placeholder: "Add a description...",
    success: "Description saved successfully!",
    rows: 3,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Comments",
    placeholder: "Leave a comment...",
    helperText: "Be respectful and constructive.",
    rows: 4,
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    placeholder: "This field is required...",
    required: true,
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled TextArea",
    placeholder: "Cannot edit",
    disabled: true,
    rows: 3,
  },
};

export const WithCountAndLimit: Story = {
  args: {
    label: "Tweet",
    placeholder: "What's happening?",
    maxLength: 280,
    showCount: true,
    autoResize: true,
    rows: 2,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <TextArea label="Small" placeholder="sm" size="sm" rows={2} />
      <TextArea label="Medium" placeholder="md" size="md" rows={3} />
      <TextArea label="Large" placeholder="lg" size="lg" rows={4} />
    </div>
  ),
};
