import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox, CheckboxGroup } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Already checked",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate state",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Required checkbox",
    error: "You must accept to continue.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Checkbox label="Small" size="sm" defaultChecked />
      <Checkbox label="Medium" size="md" defaultChecked />
      <Checkbox label="Large" size="lg" defaultChecked />
    </div>
  ),
};

export const WithGroup: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(["react"]);
    return (
      <CheckboxGroup
        name="frameworks"
        value={values}
        onChange={setValues}
        label="Select frameworks"
      >
        <Checkbox value="react" label="React" />
        <Checkbox value="vue" label="Vue" />
        <Checkbox value="angular" label="Angular" />
        <Checkbox value="svelte" label="Svelte" />
      </CheckboxGroup>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <CheckboxGroup
        name="colors"
        value={values}
        onChange={setValues}
        orientation="horizontal"
        label="Pick colors"
      >
        <Checkbox value="red" label="Red" />
        <Checkbox value="green" label="Green" />
        <Checkbox value="blue" label="Blue" />
      </CheckboxGroup>
    );
  },
};

export const GroupWithDisabled: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(["option1"]);
    return (
      <CheckboxGroup
        name="options"
        value={values}
        onChange={setValues}
        label="Options (group disabled)"
        disabled
      >
        <Checkbox value="option1" label="Option 1" />
        <Checkbox value="option2" label="Option 2" />
        <Checkbox value="option3" label="Option 3" />
      </CheckboxGroup>
    );
  },
};
