import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  HelpBlock,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

class AreaForm extends Component {
  componentWillReceiveProps = nextProps => {
    // receive area data asynchronously
    const { area } = nextProps;
    if (area._id !== this.props.area._id) {
      // initialize form only once
      this.props.initialize(area);
    }
  };
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
    const { area, handleSubmit, loading, pristine, submitting } = this.props;
    return (
      <Grid>
        <h1>
          {area._id ? 'Edit Area' : 'Add New Area'}
        </h1>
        {loading
          ? 'Loading...'
          : <Form onSubmit={handleSubmit}>
              <Field
                name="title"
                type="text"
                component={this.renderField}
                label="Area title"
                placeholder="Enter text"
              />
              <Field
                name="score"
                type="number"
                component={this.renderField}
                label="Area score"
                placeholder="Enter number from 1 to 10"
              />
              <Field
                name="desirableScore"
                type="number"
                component={this.renderField}
                label="Area desirable score"
                placeholder="Enter number from 1 to 10"
              />
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>
                  Submit
                </Button>
                <Button>
                  <Link to="/">Cancel</Link>
                </Button>
              </ButtonToolbar>
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
  } else if (values.score < 0) {
    errors.score = {
      message: 'The value of score is beneath the limit 0',
    };
  } else if (values.score > 10) {
    errors.score = {
      message: 'The value of score is exceeds the limit 10',
    };
  }
  if (!values.desirableScore) {
    errors.desirableScore = {
      message: 'You need to provide desirable score',
    };
  } else if (values.desirableScore < 0) {
    errors.desirableScore = {
      message: 'The value of desirable score is beneath the limit 0',
    };
  } else if (values.desirableScore > 10) {
    errors.desirableScore = {
      message: 'The value of desirable score is exceeds the limit 10',
    };
  }
  return errors;
};

export default reduxForm({ form: 'area', validate })(AreaForm);
