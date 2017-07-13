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
    this.props.dispatch(SectorActions.newSector());
  }
  handleSubmit = sector => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(SectorActions.saveSector({ sector, resolve, reject }));
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
