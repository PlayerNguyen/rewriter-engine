import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "text" },
    rows: { control: "text" },
    gap: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] },
    columnGap: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] },
    rowGap: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] },
    minChildWidth: { control: "text" },
    align: { control: "select", options: ["start", "center", "end", "stretch"] },
    justify: { control: "select", options: ["start", "center", "end", "stretch"] },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children: string }) => (
  <div className="bg-blue-100 border border-blue-300 rounded p-4 text-sm text-center">{children}</div>
);

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: "md",
    children: (
      <>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
      </>
    ),
  },
};

export const ResponsiveGrid: Story = {
  args: {
    minChildWidth: "200px",
    gap: "md",
    children: (
      <>
        <Cell>Card 1</Cell>
        <Cell>Card 2</Cell>
        <Cell>Card 3</Cell>
        <Cell>Card 4</Cell>
        <Cell>Card 5</Cell>
      </>
    ),
  },
};

export const WithSpans: Story = {
  render: () => (
    <Grid columns={4} gap="md">
      <GridItem colSpan={2}>
        <Cell>Span 2 columns</Cell>
      </GridItem>
      <Cell>1 col</Cell>
      <Cell>1 col</Cell>
      <Cell>1 col</Cell>
      <GridItem colSpan={3}>
        <Cell>Span 3 columns</Cell>
      </GridItem>
    </Grid>
  ),
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: "lg",
    children: (
      <>
        <Cell>Left</Cell>
        <Cell>Right</Cell>
        <Cell>Left</Cell>
        <Cell>Right</Cell>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: "sm",
    children: (
      <>
        <Cell>A</Cell>
        <Cell>B</Cell>
        <Cell>C</Cell>
        <Cell>D</Cell>
      </>
    ),
  },
};

export const CustomTemplate: Story = {
  args: {
    columns: "1fr 2fr 1fr",
    gap: "md",
    children: (
      <>
        <Cell>Sidebar</Cell>
        <Cell>Main Content</Cell>
        <Cell>Aside</Cell>
      </>
    ),
  },
};

export const ColumnAndRowGap: Story = {
  args: {
    columns: 3,
    columnGap: "xl",
    rowGap: "sm",
    children: (
      <>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
      </>
    ),
  },
};
