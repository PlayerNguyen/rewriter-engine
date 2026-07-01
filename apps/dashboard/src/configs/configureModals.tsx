import { configureModalService, type ModalBaseProps } from '@rewriter/modal';
import { EditSettingModal, type EditSettingModalCustomProps } from '@rewriter/settings-ui';
import {
  CreateSourceModal,
  type CreateSourceModalCustomProps,
  EditSourceModal,
  type EditSourceModalCustomProps,
} from '@rewriter/sources-ui';
import { ConfirmModal, type ConfirmModalProps } from '@rewriter/ui';
import { LanguageModal } from '../components/LanguageModal';

export const { ModalProvider, useModal } = configureModalService({
  language: (p: ModalBaseProps) => <LanguageModal {...p} />,
  confirm: (p: ModalBaseProps & ConfirmModalProps) => <ConfirmModal {...p} />,
  'edit-setting': (p: ModalBaseProps & EditSettingModalCustomProps) => <EditSettingModal {...p} />,
  'create-source': (p: ModalBaseProps & CreateSourceModalCustomProps) => (
    <CreateSourceModal {...p} />
  ),
  'edit-source': (p: ModalBaseProps & EditSourceModalCustomProps) => <EditSourceModal {...p} />,
});
