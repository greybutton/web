import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ id, customFields, handleClose, message }) =>
  (<Alert
    id={id}
    className="s-alert-top alert-message"
    bsStyle={customFields.bsStyle}
    onDismiss={handleClose}
  >
    {message}
  </Alert>);

AlertMessage.propTypes = {
  id: PropTypes.string.isRequired,
  customFields: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
