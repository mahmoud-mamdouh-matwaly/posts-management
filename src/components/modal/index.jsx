import { Modal, theme } from 'antd';
import PropTypes from 'prop-types';
import BaseButton from 'components/button';

const { useToken } = theme;

const BaseModal = props => {
  const {
    isModalOpen,
    isLoading,
    handleCancel,
    handleSubmit,
    children,
    title = '',
    okText,
    danger = false,
    isDisabled = false,
    testId,
    ...rest
  } = props;
  const { token } = useToken();

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={okText}
      confirmLoading={isLoading}
      maskClosable={false}
      data-testid={testId}
      footer={
        okText
          ? [
              <BaseButton
                key="back"
                type="default"
                bg={token.colorLight}
                onClick={handleCancel}
                text="Cancel"
                testId="cancelBtn"
              />,
              <BaseButton
                key="submit"
                type="primary"
                text={okText}
                danger={danger}
                loading={isLoading}
                onClick={handleSubmit}
                isDisabled={isDisabled}
                testId="submitBtn"
              />,
            ]
          : null
      }
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;

BaseModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  okText: PropTypes.string,
  danger: PropTypes.bool,
  isDisabled: PropTypes.bool,
  testId: PropTypes.string,
};
