import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SectorActions from '../actions/SectorActions';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>List of Sectors</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sectors: state.sectorStore.sectors,
    sectorSearchResult: state.sectorStore.searchResult,
    loading: state.sectorStore.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SectorActions: bindActionCreators(SectorActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
