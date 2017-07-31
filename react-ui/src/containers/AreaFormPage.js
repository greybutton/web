import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as AreaActions from '../actions/AreaActions';
import AreaForm from '../components/AreaForm';

class AreaFormPage extends Component {
  state = {
    redirect: false,
  };
  componentDidMount() {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.dispatch(AreaActions.requestArea(_id));
    } else {
      this.props.dispatch(AreaActions.newArea());
    }
  }
  handleSubmit = area => {
    if (!area._id) {
      return new Promise((resolve, reject) => {
        this.props.dispatch(AreaActions.saveArea({ area, resolve, reject }));
      })
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors);
        });
    } else {
      return new Promise((resolve, reject) => {
        this.props.dispatch(AreaActions.updateArea({ area, resolve, reject }));
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
          : <AreaForm
              area={this.props.area}
              loading={this.props.loading}
              onSubmit={this.handleSubmit}
            />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    area: state.areaStore.area,
    loading: state.areaStore.loading,
    errors: state.areaStore.errors,
  };
}

export default connect(mapStateToProps)(AreaFormPage);
