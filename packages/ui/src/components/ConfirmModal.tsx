import { Button, Modal } from '@rewriter/ui';

export interface ConfirmModalProps {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

/**
 * Generic confirmation dialog.
 *
 * Displays a message with Cancel and Confirm buttons.
 * `onConfirm` is called when the user clicks confirm.
 *
 * @example
 * ```tsx
 * const { open } = useModal();
 * open('confirm', {
 *   message: 'Delete this item?',
 *   onConfirm: () => deleteItem(),
 * });
 * ```
 */
export function ConfirmModal({
  open,
  onClose,
  title = 'Confirm',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
} & ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm" title={title}>
      <p className="text-sm text-ink-subtle">{message}</p>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
