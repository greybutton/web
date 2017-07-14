import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Grid,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  HelpBlock,
  Button,
} from 'react-bootstrap';

class SectorForm extends Component {
  renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <FormGroup validationState={touched && error ? 'error' : null}>
        <ControlLabel>
          {label}
        </ControlLabel>
        {type === 'number'
          ? <InputGroup>
              <FormControl {...input} placeholder={placeholder} type={type} />
              <InputGroup.Addon>/10</InputGroup.Addon>
            </InputGroup>
          : <FormControl {...input} placeholder={placeholder} type={type} />}
        {touched &&
          error &&
          <HelpBlock>
            {error.message}
          </HelpBlock>}
      </FormGroup>
    );
  };
  render() {
    const { sector, handleSubmit, loading, pristine, submitting } = this.props;
    return (
      <Grid>
        <h1>
          {sector._id ? 'Edit Sector' : 'Add New Sector'}
        </h1>
        {loading
          ? 'Loading...'
          : <Form onSubmit={handleSubmit}>
              <Field
                name="title"
                type="text"
                component={this.renderField}
                label="Sector title"
                placeholder="Enter text"
              />
              <Field
                name="score"
                type="number"
                component={this.renderField}
                label="Sector score"
                placeholder="Enter number from 1 to 10"
              />
              <Field
                name="desirableScore"
                type="number"
                component={this.renderField}
                label="Sector desirable score"
                placeholder="Enter number from 1 to 10"
              />
              <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>
                Submit
              </Button>
            </Form>}
      </Grid>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = {
      message: 'You need to provide title',
    };
  }
  if (!values.score) {
    errors.score = {
      message: 'You need to provide score',
    };
  }
  if (!values.desirableScore) {
    errors.desirableScore = {
      message: 'You need to provide desirable score',
    };
  }
  return errors;
};

export default reduxForm({ form: 'sector', validate })(SectorForm);
