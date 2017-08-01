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
  componentWillReceiveProps = nextProps => {
    // receive task data asynchronously
    const { task } = nextProps;
    if (task._id !== this.props.task._id) {
      // initialize form only once
      this.props.initialize(task);
    }
  };
  shouldComponentUpdate = (nextProps, nextState) => {
    if (Object.keys(nextProps.task).length === 0 && !nextProps.anyTouched) {
      return false;
    } else {
      return true;
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    const { task } = prevProps;
    // refs should be exist
    // if refs doesn't exist checked is null and after submit form null prevent redirect
    if (Object.keys(prevState).length === 0 && this.daily) {
      if (task.quadrant === 'daily') {
        this.daily.checked = true;
      }
      if (task.quadrant === 'first') {
        this.urgent.checked = true;
        this.important.checked = true;
      }
      if (task.quadrant === 'second') {
        this.notUrgent.checked = true;
        this.important.checked = true;
      }
      if (task.quadrant === 'third') {
        this.urgent.checked = true;
        this.notImportant.checked = true;
      }
      if (task.quadrant === 'fourth') {
        this.notUrgent.checked = true;
        this.notImportant.checked = true;
      }
    }
  };
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
                this.area = ref;
              }}
              {...input}
            >
              <option />
              {this.props.areaList.map(area => {
                return (
                  <option key={area._id} value={area._id} data-title={area.title}>
                    {area.title}
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
        {type === 'checkbox' ? this.checkboxDaily({ input }) : this.pickMatrixButtons({ input })}
        {touched &&
          error &&
          <HelpBlock>
            {error.message}
          </HelpBlock>}
      </FormGroup>
    );
  };
  checkboxDaily = ({ input }) => {
    return (
      <div>
        <ControlLabel>Is task daily?</ControlLabel>
        <div>
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
        </div>
      </div>
    );
  };
  pickMatrixButtons = ({ input }) => {
    return (
      <div
        {...input}
        onClick={this.handleChangePickMatrix}
        style={{ display: this.state.daily ? 'none' : '' }}
      >
        <ControlLabel>Pick quadrant of the matrix</ControlLabel>
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

    if (daily) {
      this.urgent.checked = false;
      this.notUrgent.checked = false;
      this.important.checked = false;
      this.notImportant.checked = false;
    }

    this.setState({
      daily: daily,
      urgent: urgent,
      notUrgent: notUrgent,
      important: important,
      notImportant: notImportant,
    });
  };
  handleChangeArea = () => {
    const index = this.area.options.selectedIndex;
    const title = this.area.options[index].dataset.title;
    this.props.change('label', title);
  };
  render() {
    const { task, handleSubmit, loading, pristine, submitting } = this.props;
    return (
      <Grid>
        <h1>
          {task._id ? 'Edit Task' : 'Add New Task'}
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
                name="area"
                type="select"
                component={this.renderField}
                onChange={this.handleChangeArea}
                label="Pick area of the wheel of life"
              />
              <Field
                name="quadrant"
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
                name="quadrant"
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

const validate = values => {
  const errors = {};
  if (!values.text) {
    errors.text = {
      message: 'You need to provide text',
    };
  }
  if (!values.time) {
    errors.time = {
      message: 'You need to provide time',
    };
  }
  if (!values.area) {
    errors.area = {
      message: 'You need to provide area',
    };
  }
  return errors;
};

export default reduxForm({ form: 'task', validate })(TaskForm);
