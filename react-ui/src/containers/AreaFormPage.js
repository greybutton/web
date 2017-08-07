/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as AreaActions from '../actions/AreaActions';
import AreaForm from '../components/AreaForm';

class AreaFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.dispatch(AreaActions.requestArea(_id));
    } else {
      this.props.dispatch(AreaActions.newArea());
    }
  }
  render() {
    const handleSubmit = (area) => {
      if (!area._id) {
        return new Promise((resolve, reject) => {
          this.props.dispatch(AreaActions.saveArea({ area, resolve, reject }));
        })
          .then(() => this.setState({ redirect: true }))
          .catch(() => {
            throw new SubmissionError(this.props.errors);
          });
      }
      return new Promise((resolve, reject) => {
        this.props.dispatch(AreaActions.updateArea({ area, resolve, reject }));
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
          : <AreaForm
            area={this.props.area}
            loading={this.props.loading}
            onSubmit={handleSubmit}
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

AreaFormPage.propTypes = {
  area: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AreaFormPage);
