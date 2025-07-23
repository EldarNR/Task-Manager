// libraries
import type { FC, ReactNode } from 'react';
// components
import {
  Dialog as BpDialog,
  DialogBody,
} from '@blueprintjs/core';

interface ModalProps {
  isOpen: boolean;
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => (
  <BpDialog
    className="dialog"
    isCloseButtonShown
    isOpen={isOpen}
    lazy
    onClose={onClose}
    title={title}
  >
    <DialogBody className="dialog--body">
      {children}
    </DialogBody>

  </BpDialog>
);

export default Modal;
