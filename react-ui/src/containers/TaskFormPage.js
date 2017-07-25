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
    this.props.dispatch(TaskActions.newTask());
  }
  handleSubmit = task => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(TaskActions.saveTask({ task, resolve, reject }));
    })
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errors);
      });
  };
  render() {
    return (
      <div>
        {this.state.redirect
          ? <Redirect to="/" />
          : <TaskForm
              sectors={this.props.sectors}
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
    sectors: state.sectorStore.sectors,
    task: state.taskStore.task,
    loading: state.taskStore.loading,
    errors: state.taskStore.errors,
  };
}

export default connect(mapStateToProps)(TaskFormPage);
