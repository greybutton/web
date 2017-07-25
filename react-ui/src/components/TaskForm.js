import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Grid,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  ButtonToolbar,
  Checkbox,
  ButtonGroup,
  Radio,
} from 'react-bootstrap';

class TaskForm extends Component {
  state = {};
  renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <FormGroup validationState={touched && error ? 'error' : null}>
        <ControlLabel>
          {label}
        </ControlLabel>
        {type === 'select'
          ? <FormControl
              componentClass="select"
              placeholder="select"
              inputRef={ref => {
                this.sector = ref;
              }}
              {...input}
            >
              <option />
              {this.props.sectors.map(sector => {
                return (
                  <option key={sector._id} value={sector._id} data-title={sector.title}>
                    {sector.title}
                  </option>
                );
              })}
            </FormControl>
          : <FormControl {...input} placeholder={placeholder} type={type} />}
        {touched &&
          error &&
          <HelpBlock>
            {error.message}
          </HelpBlock>}
      </FormGroup>
    );
  };
  renderMatrix = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <FormGroup validationState={touched && error ? 'error' : null}>
        {type === 'checkbox'
          ? this.checkboxDaily({ input, label, type, placeholder, meta: { touched, error } })
          : this.pickMatrixButtons({ input, label, type, placeholder, meta: { touched, error } })}
        {touched &&
          error &&
          <HelpBlock>
            {error.message}
          </HelpBlock>}
      </FormGroup>
    );
  };
  checkboxDaily = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <Button>
        <Checkbox
          {...input}
          inline
          id="daily"
          checked={this.state.daily ? true : false}
          onBlur={e => e.preventDefault()}
          inputRef={ref => {
            this.daily = ref;
          }}
        >
          Daily
        </Checkbox>
      </Button>
    );
  };
  pickMatrixButtons = ({ input, label, type, placeholder, meta: { touched, error } }) => {
    return (
      <div
        {...input}
        onClick={this.handleChangePickMatrix}
        style={{ display: this.state.daily ? 'none' : '' }}
      >
        <ControlLabel>Pick matrix quarter</ControlLabel>
        <FormGroup>
          <ButtonGroup>
            <Button>
              <Radio
                name="urgent"
                id="urgent"
                inline
                inputRef={ref => {
                  this.urgent = ref;
                }}
              >
                Urgent
              </Radio>
            </Button>
            <Button>
              <Radio
                name="urgent"
                id="notUrgent"
                inline
                inputRef={ref => {
                  this.notUrgent = ref;
                }}
              >
                Not urgent
              </Radio>
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button>
              <Radio
                name="important"
                id="important"
                inline
                inputRef={ref => {
                  this.important = ref;
                }}
              >
                Important
              </Radio>
            </Button>
            <Button>
              <Radio
                name="important"
                id="notImportant"
                inline
                inputRef={ref => {
                  this.notImportant = ref;
                }}
              >
                Not important
              </Radio>
            </Button>
          </ButtonGroup>
          {touched &&
            error &&
            <HelpBlock>
              {error}
            </HelpBlock>}
        </FormGroup>
      </div>
    );
  };
  handleChangePickMatrix = () => {
    const daily = this.daily.checked;
    const urgent = this.urgent.checked;
    const notUrgent = this.notUrgent.checked;
    const important = this.important.checked;
    const notImportant = this.notImportant.checked;

    this.setState({
      daily: daily,
      urgent: urgent,
      notUrgent: notUrgent,
      important: important,
      notImportant: notImportant,
    });
  };
  handleChangeSector = () => {
    const index = this.sector.options.selectedIndex;
    const title = this.sector.options[index].dataset.title;
    this.props.change('label', title);
  };
  render() {
    const { task, handleSubmit, loading, pristine, submitting } = this.props;
    return (
      <Grid>
        <h1>
          {task.id ? 'Edit Task' : 'Add New Task'}
        </h1>
        {loading
          ? 'Loading...'
          : <Form onSubmit={handleSubmit}>
              <Field
                name="text"
                type="text"
                component={this.renderField}
                label="Task text"
                placeholder="Enter text"
              />
              <Field
                name="time"
                type="text"
                component={this.renderField}
                label="Task time"
                placeholder="Enter time hh:mm"
              />
              <Field
                name="sector"
                type="select"
                component={this.renderField}
                onChange={this.handleChangeSector}
                label="Pick sector"
              />
              <Field
                name="matrixQuarter"
                type="checkbox"
                component={this.renderMatrix}
                onChange={this.handleChangePickMatrix}
                normalize={(value, previousValue) => {
                  if (previousValue === 'daily') {
                    return (value = '');
                  } else {
                    return (value = 'daily');
                  }
                }}
              />
              <Field
                name="matrixQuarter"
                component={this.renderMatrix}
                normalize={(value, previousValue) => {
                  if (this.state.urgent && this.state.important) {
                    return (value = 'first');
                  }
                  if (this.state.urgent && this.state.notImportant) {
                    return (value = 'third');
                  }
                  if (this.state.notUrgent && this.state.important) {
                    return (value = 'second');
                  }
                  if (this.state.notUrgent && this.state.notImportant) {
                    return (value = 'fourth');
                  }
                }}
              />
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>
                  Submit
                </Button>
              </ButtonToolbar>
            </Form>}
      </Grid>
    );
  }
}

export default reduxForm({ form: 'task' })(TaskForm);
