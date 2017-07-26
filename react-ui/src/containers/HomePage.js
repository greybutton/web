import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as SectorActions from '../actions/SectorActions';
import * as TaskActions from '../actions/TaskActions';
import SectorList from '../components/SectorList';
import TaskList from '../components/TaskList';

class HomePage extends Component {
  componentDidMount() {
    const { requestSectors } = this.props.SectorActions;
    const { requestTasks } = this.props.TaskActions;
    requestSectors();
    requestTasks();
  }
  render() {
    return (
      <Row>
        <Col xs={12} sm={6}>
          <TaskList
            importantTasks={this.props.importantTasks}
            sectors={this.props.sectors}
            loading={this.props.loading}
            updateImportantTasksOrder={this.props.TaskActions.updateImportantTasksOrder}
          />
        </Col>
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
    importantTasks: state.taskStore.importantTasks,
    loading: state.sectorStore.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SectorActions: bindActionCreators(SectorActions, dispatch),
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
