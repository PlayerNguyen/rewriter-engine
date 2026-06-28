import type { ReactNode } from 'react';

/**
 * Props automatically injected by the modal service into every modal.
 * Modals receive `open` (visibility gate) and `onClose` (dismiss).
 */
export interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
}

/**
 * A factory function that receives {@link ModalBaseProps} merged with
 * the modal's custom props and returns a React node.
 *
 * @typeParam TCustom - Shape of the custom props beyond {@link ModalBaseProps}.
 */
export type ModalFactory<TCustom = Record<string, never>> = (
  props: ModalBaseProps & TCustom,
) => ReactNode;

/**
 * Registry mapping string keys to {@link ModalFactory} functions.
 * Each key's factory defines the custom props that `open()` will require.
 *
 * @example
 * const registry = {
 *   'edit-setting': (p: ModalBaseProps & { settingId: string }) => <EditSettingModal {...p} />,
 * };
 */
export type ModalRegistry = Record<string, ModalFactory<any>>;

/** Extracts the custom props (excluding {@link ModalBaseProps}) for a given factory. */
export type CustomProps<TFactory extends ModalFactory<any>> = Omit<
  Parameters<TFactory>[0],
  keyof ModalBaseProps
>;
