import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as SectorActions from '../actions/SectorActions';
import SectorForm from '../components/SectorForm';

class SectorFormPage extends Component {
  state = {
    redirect: false,
  };
  componentDidMount() {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.dispatch(SectorActions.requestSector(_id));
    } else {
      this.props.dispatch(SectorActions.newSector());
    }
  }
  handleSubmit = sector => {
    if (!sector._id) {
      return new Promise((resolve, reject) => {
        this.props.dispatch(SectorActions.saveSector({ sector, resolve, reject }));
      })
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors);
        });
    } else {
      return new Promise((resolve, reject) => {
        this.props.dispatch(SectorActions.updateSector({ sector, resolve, reject }));
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
          : <SectorForm
              sector={this.props.sector}
              loading={this.props.loading}
              onSubmit={this.handleSubmit}
            />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sector: state.sectorStore.sector,
    loading: state.sectorStore.loading,
    errors: state.sectorStore.errors,
  };
}

export default connect(mapStateToProps)(SectorFormPage);
