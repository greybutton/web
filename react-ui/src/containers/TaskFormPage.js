/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/TaskActions';
import TaskForm from '../components/TaskForm';

class TaskFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.dispatch(TaskActions.requestTask(_id));
    } else {
      this.props.dispatch(TaskActions.newTask());
    }
  }
  render() {
    const handleSubmit = (task) => {
      if (!task._id) {
        return new Promise((resolve, reject) => {
          this.props.dispatch(TaskActions.saveTask({ task, resolve, reject }));
        })
          .then(() => this.setState({ redirect: true }))
          .catch(() => {
            throw new SubmissionError(this.props.errors);
          });
      }
      return new Promise((resolve, reject) => {
        this.props.dispatch(TaskActions.updateTask({ task, resolve, reject }));
      })
        .then(() => this.setState({ redirect: true }))
        .catch(() => {
          throw new SubmissionError(this.props.errors);
        });
    };
    return (
      <div>
        {this.state.redirect
          ? <Redirect to="/" />
          : <TaskForm
            areaList={this.props.areaList}
            task={this.props.task}
            loading={this.props.loading}
            onSubmit={handleSubmit}
          />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    areaList: state.areaStore.areaList,
    task: state.taskStore.task,
    loading: state.taskStore.loading,
    errors: state.taskStore.errors,
  };
}

TaskFormPage.propTypes = {
  task: PropTypes.object.isRequired,
  areaList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TaskFormPage);
