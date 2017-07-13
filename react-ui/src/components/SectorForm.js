import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Grid,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Button,
} from 'react-bootstrap';

class SectorForm extends Component {
  componentWillReceiveProps = nextProps => {
    const { sector } = nextProps;
    if (sector._id !== this.props.sector._id) {
      console.log('will props', sector);
      this.props.initialize(sector);
    }
  };
  renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <FormGroup>
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
          <span className="error">
            {error.message}
          </span>}
      </FormGroup>
    );
  };
  render() {
    const { sector, handleSubmit } = this.props;
    return (
      <Grid>
        <h1>
          {sector._id ? 'Edit Sector' : 'Add New Sector'}
        </h1>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit">Submit</Button>
        </Form>
      </Grid>
    );
  }
}

export default reduxForm({ form: 'sector' })(SectorForm);
