import { configureModalService, type ModalBaseProps } from '@rewriter/modal';
import { EditSettingModal, type EditSettingModalCustomProps } from '@rewriter/settings-ui';
import { LanguageModal } from '../components/LanguageModal';

export const { ModalProvider, useModal } = configureModalService({
  language: (p: ModalBaseProps) => <LanguageModal {...p} />,
  'edit-setting': (p: ModalBaseProps & EditSettingModalCustomProps) => <EditSettingModal {...p} />,
});
