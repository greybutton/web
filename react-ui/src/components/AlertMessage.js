import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class AlertMessage extends Component {
  render() {
    return (
      <Alert
        id={this.props.id}
        style={{ position: 'absolute', zIndex: 1000 }}
        className="s-alert-top"
        bsStyle={this.props.customFields.bsStyle}
        onDismiss={this.props.handleClose}
      >
        {this.props.message}
      </Alert>
    );
  }
}

export default AlertMessage;
