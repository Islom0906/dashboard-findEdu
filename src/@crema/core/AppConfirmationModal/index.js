import React from 'react';
import {Modal} from 'antd';

import PropTypes from 'prop-types';
import './index.style.less';

const AppConfirmationModal = ({
  open,
  onDeny,
  onConfirm,
  paragraph,
  modalTitle,
}) => {
  return (
    <Modal
      title={modalTitle}
      visible={open}
      onOk={onConfirm}
      onCancel={() => onDeny(false)}>
      <p className='para-text'>{paragraph}</p>
    </Modal>
  );
};

AppConfirmationModal.propTypes = {
  modalTitle: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  onDeny: PropTypes.func.isRequired,
  paragraph: PropTypes.any,
  onConfirm: PropTypes.func.isRequired,
};

AppConfirmationModal.defaultProps = {
  paragraph: 'Are you sure you want to delete?',
};
export default AppConfirmationModal;
