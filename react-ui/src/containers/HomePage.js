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
            loading={this.props.loadingTask}
            deleteTask={this.props.TaskActions.deleteTask}
            updateImportantTasksOrder={this.props.TaskActions.updateImportantTasksOrder}
          />
        </Col>
        <Col xs={12} sm={6}>
          <SectorList
            sectors={this.props.sectors}
            loading={this.props.loadingSector}
            updateSectorOrder={this.props.SectorActions.updateSectorOrder}
          />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadingSector: state.sectorStore.loading,
    sectors: state.sectorStore.sectors,
    loadingTask: state.taskStore.loading,
    importantTasks: state.taskStore.importantTasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SectorActions: bindActionCreators(SectorActions, dispatch),
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
