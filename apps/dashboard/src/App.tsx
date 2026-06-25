import {
  Button,
  Box,
  Stack,
  Grid,
  Text,
  Icon,
  TextInput,
  TextArea,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  Modal,
  Tooltip,
  useTheme,
} from "@rewriter/ui";
import { useState } from "react";

const selectOptions = [
  { value: "explorer", label: "Explorer Engine" },
  { value: "rewriter", label: "Rewriter Engine" },
  { value: "dashboard", label: "Dashboard" },
];

export function App() {
  const { theme, setTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState("explorer");
  const [selectValue, setSelectValue] = useState("");

  return (
    <Box as="main" className="min-h-screen bg-canvas p-8">
      <Stack gap="xl" className="max-w-4xl mx-auto">
        <Stack direction="horizontal" justify="between" align="center">
          <Text size="display-md" weight={600}>
            @rewriter/ui
          </Text>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </Stack>

        {/* Buttons */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Buttons
          </Text>
          <Stack gap="md">
            <Stack direction="horizontal" gap="sm" wrap>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="inverse">Inverse</Button>
              <Button variant="danger">Danger</Button>
            </Stack>
            <Stack direction="horizontal" gap="sm" align="center">
              <Button size="xs">XS</Button>
              <Button size="sm">SM</Button>
              <Button size="md">MD</Button>
              <Button size="lg">LG</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </Stack>
          </Stack>
        </Box>

        {/* Typography */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Typography
          </Text>
          <Stack gap="sm">
            <Text size="display-lg">Display LG</Text>
            <Text size="headline">Headline</Text>
            <Text size="card-title">Card Title</Text>
            <Text size="body-lg">Body Large</Text>
            <Text size="body">Body Default</Text>
            <Text size="body-sm">Body Small</Text>
            <Text size="caption" color="ink-subtle">Caption</Text>
            <Text size="eyebrow" color="primary">EYEBROW</Text>
            <Text size="mono">mono: 13px / JetBrains Mono</Text>
          </Stack>
        </Box>

        {/* Form Inputs */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Form Inputs
          </Text>
          <Grid columns={2} gap="md">
            <TextInput label="Source URL" placeholder="https://..." required />
            <TextInput label="API Key" helperText="Your LLM provider key" />
            <TextInput label="Error Field" error="This field is required" />
            <TextInput label="Success" success="Configuration saved" />
            <Select
              label="Service"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Choose a service..."
            />
            <Select
              label="With Error"
              options={selectOptions}
              error="Please select a service"
            />
          </Grid>
          <Box mt="lg">
            <TextArea label="System Prompt" placeholder="Enter your prompt..." helperText="Describe how the rewriter should behave" />
          </Box>
        </Box>

        {/* Selection */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Selection
          </Text>
          <Grid columns={2} gap="xl">
            <CheckboxGroup
              name="features"
              value={checkboxValues}
              onChange={setCheckboxValues}
              label="Features"
            >
              <Checkbox value="crawl" label="Auto-crawl sources" />
              <Checkbox value="rewrite" label="LLM rewriting" />
              <Checkbox value="schedule" label="Scheduled runs" />
              <Checkbox value="notify" label="Notifications" />
            </CheckboxGroup>
            <RadioGroup
              name="engine"
              value={radioValue}
              onChange={setRadioValue}
              label="Engine"
            >
              <Radio value="explorer" label="Explorer" />
              <Radio value="rewriter" label="Rewriter" />
              <Radio value="both" label="Both" />
            </RadioGroup>
          </Grid>
        </Box>

        {/* Overlays */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Overlays
          </Text>
          <Stack direction="horizontal" gap="sm">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Tooltip content="This is a tooltip">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </Stack>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Action"
            description="This will start the rewriting process for all queued articles."
          >
            <Text size="body" color="ink-muted">
              Are you sure you want to proceed? This action cannot be undone.
            </Text>
            <Stack direction="horizontal" justify="end" gap="sm" className="mt-6">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </Stack>
          </Modal>
        </Box>

        {/* Layout */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Layout
          </Text>
          <Grid columns={3} gap="sm">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Box key={i} className="bg-surface-2 rounded-md p-4 text-center">
                <Text size="caption" color="ink-subtle">
                  Grid Item {i}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Icons */}
        <Box as="section" className="rounded-lg border border-hairline bg-surface-1 p-6">
          <Text size="button" color="ink-subtle" className="uppercase tracking-wide mb-4">
            Icons
          </Text>
          <Stack direction="horizontal" gap="md" align="center">
            <Icon size="xs" label="Small icon">
              <circle cx="12" cy="12" r="10" />
            </Icon>
            <Icon size="sm" label="Medium icon">
              <circle cx="12" cy="12" r="10" />
            </Icon>
            <Icon size="md" label="Large icon">
              <circle cx="12" cy="12" r="10" />
            </Icon>
            <Icon size="lg" label="Extra large icon">
              <circle cx="12" cy="12" r="10" />
            </Icon>
            <Icon size="xl" spin>
              <circle cx="12" cy="12" r="10" />
            </Icon>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
