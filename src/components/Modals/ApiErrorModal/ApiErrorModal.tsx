import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { ErrorDto } from '../../../core/models/dtos/error.dto';
import { setApiError } from '../../../core/services/app/setApiError/setApiError.slice';
import { Errors } from '../../../core/services/errors';
import { useAppDispatch, useAppSelector } from '../../../core/services/hooks';
import { UI } from '../../../core/utilities/ui';
import AppButton from '../../Buttons/AppButton/AppButton';
import './ApiErrorModal.scss';

function ApiErrorModal() {
  const apiError = useAppSelector((state) => state.app.setApiError.error);
  const dispatch = useAppDispatch();

  const isOpen = (): boolean => {
    return !!apiError;
  };

  const closeModal = (): void => {
    dispatch(setApiError());
  };

  const getTitle = (): string => {
    return Errors.errorGenericTitle;
  };

  const getText = (error: ErrorDto): string => {
    return error.message ?? Errors.errorGenericText;
  };

  return (
    <Modal
      className="api-error-modal"
      maskStyle={UI.modalMaskStyle()}
      open={isOpen()}
      closable={false}
      footer={null}
      centered
      destroyOnClose
      onCancel={closeModal}
    >
      {apiError && (
        <div className="content">
          <CloseCircleOutlined className="icon" />
          <span className="title">{getTitle()}</span>
          <span className="text">{getText(apiError)}</span>
          <AppButton onClick={closeModal}>OK</AppButton>
        </div>
      )}
    </Modal>
  );
}

export default ApiErrorModal;
