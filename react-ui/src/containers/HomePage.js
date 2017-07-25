import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as SectorActions from '../actions/SectorActions';
import SectorList from '../components/SectorList';

class HomePage extends Component {
  componentDidMount() {
    const { requestSectors } = this.props.SectorActions;
    requestSectors();
  }
  render() {
    return (
      <Row>
        <Col xs={12} sm={6} />
        <Col xs={12} sm={6}>
          <SectorList
            sectors={this.props.sectors}
            loading={this.props.loading}
            updateSectorOrder={this.props.SectorActions.updateSectorOrder}
          />
        </Col>
      </Row>
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
