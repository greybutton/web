import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/TaskActions';
import TaskForm from '../components/TaskForm';

class TaskFormPage extends Component {
  state = {
    redirect: false,
  };
  componentDidMount() {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.dispatch(TaskActions.requestTask(_id));
    } else {
      this.props.dispatch(TaskActions.newTask());
    }
  }
  handleSubmit = task => {
    if (!task._id) {
      return new Promise((resolve, reject) => {
        this.props.dispatch(TaskActions.saveTask({ task, resolve, reject }));
      })
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors);
        });
    } else {
      return new Promise((resolve, reject) => {
        this.props.dispatch(TaskActions.updateTask({ task, resolve, reject }));
      })
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors);
        });
    }
  };
  render() {
    return (
      <div>
        {this.state.redirect
          ? <Redirect to="/" />
          : <TaskForm
              areaList={this.props.areaList}
              task={this.props.task}
              loading={this.props.loading}
              onSubmit={this.handleSubmit}
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

export default connect(mapStateToProps)(TaskFormPage);
