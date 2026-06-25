import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Forms/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: "Option A",
    name: "default",
    value: "a",
  },
};

export const Checked: Story = {
  args: {
    label: "Selected option",
    name: "checked",
    value: "a",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled radio",
    name: "disabled",
    value: "a",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Radio label="Small" name="sizes" value="sm" size="sm" defaultChecked />
      <Radio label="Medium" name="sizes" value="md" size="md" defaultChecked />
      <Radio label="Large" name="sizes" value="lg" size="lg" defaultChecked />
    </div>
  ),
};

export const WithGroup: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="options"
        value={value}
        onChange={setValue}
        label="Choose an option"
      >
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [value, setValue] = useState("small");
    return (
      <RadioGroup
        name="size"
        value={value}
        onChange={setValue}
        orientation="horizontal"
        label="T-shirt size"
      >
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </RadioGroup>
    );
  },
};

export const GroupWithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <RadioGroup
        name="required"
        value={value}
        onChange={setValue}
        label="Required selection"
        error="Please select an option."
      >
        <Radio value="yes" label="Yes" />
        <Radio value="no" label="No" />
        <Radio value="maybe" label="Maybe" />
      </RadioGroup>
    );
  },
};

export const GroupDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup
        name="disabled-group"
        value={value}
        onChange={setValue}
        label="Disabled group"
        disabled
      >
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    );
  },
};
