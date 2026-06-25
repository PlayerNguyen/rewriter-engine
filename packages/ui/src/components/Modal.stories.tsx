import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import { Modal, ModalFooter, ModalHeader } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    open: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader onClose={() => setOpen(false)}>
            <h2 className="text-lg font-semibold text-ink">Basic Modal</h2>
          </ModalHeader>
          <p className="text-sm text-ink-muted mt-2">
            This is a basic modal. Click the backdrop, press Escape, or use the close button to
            dismiss.
          </p>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed? This action cannot be undone.',
    children: (
      <div className="flex justify-end gap-3 mt-4">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Small Modal',
    size: 'sm',
    children: <p className="text-sm text-ink-muted">A compact small-sized modal.</p>,
  },
};

export const LargeSize: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p className="text-sm text-ink-muted mb-4">
          This is a large modal with more space for content. It can hold forms, tables, or other
          complex layouts.
        </p>
        <div className="bg-surface-2 rounded p-4">
          <p className="text-sm">Nested content area</p>
        </div>
      </div>
    ),
  },
};

export const ExtraLargeSize: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Extra Large Modal',
    size: 'xl',
    children: (
      <p className="text-sm text-ink-muted">
        An extra-large modal for displaying detailed information, wide tables, or dashboards.
      </p>
    ),
  },
};

export const FullSize: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Full Width Modal',
    size: 'full',
    children: (
      <p className="text-sm text-ink-muted">
        This modal takes up the full available width (with small margins).
      </p>
    ),
  },
};

export const WithModalHeader: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: (
      <>
        <ModalHeader onClose={() => {}}>
          <h2 className="text-lg font-semibold text-ink">Custom Header</h2>
        </ModalHeader>
        <p className="text-sm text-ink-muted mt-2">
          This modal uses the ModalHeader component with a close button.
        </p>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ModalFooter>
      </>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Interactive Modal">
          <p className="text-sm text-ink-muted mb-4">
            This modal opens and closes via state management.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [activeSize, setActiveSize] = useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    return (
      <>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button key={size} variant="secondary" onClick={() => setActiveSize(size)}>
              {size}
            </Button>
          ))}
        </div>
        {activeSize && (
          <Modal
            open={!!activeSize}
            onClose={() => setActiveSize(null)}
            title={`${activeSize.toUpperCase()} Modal`}
            size={activeSize as any}
          >
            <p className="text-sm text-ink-muted">Size: {activeSize}</p>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" onClick={() => setActiveSize(null)}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  },
};
