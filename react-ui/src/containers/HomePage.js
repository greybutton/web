import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as AreaActions from '../actions/AreaActions';
import * as TaskActions from '../actions/TaskActions';
import AreaList from '../components/AreaList';
import TaskList from '../components/TaskList';

class HomePage extends Component {
  componentDidMount() {
    const { requestAreaList } = this.props.AreaActions;
    const { requestTaskList } = this.props.TaskActions;
    requestAreaList();
    requestTaskList();
  }
  render() {
    return (
      <Row>
        <Col xs={12} sm={6}>
          <TaskList
            importantTaskList={this.props.importantTaskList}
            areaList={this.props.areaList}
            loading={this.props.loadingTask}
            deleteTask={this.props.TaskActions.deleteTask}
            updateTaskListImportantOrder={this.props.TaskActions.updateTaskListImportantOrder}
          />
        </Col>
        <Col xs={12} sm={6}>
          <AreaList
            areaList={this.props.areaList}
            loading={this.props.loadingArea}
            updateAreaListOrder={this.props.AreaActions.updateAreaListOrder}
          />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadingArea: state.areaStore.loading,
    areaList: state.areaStore.areaList,
    loadingTask: state.taskStore.loading,
    importantTaskList: state.taskStore.importantTaskList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AreaActions: bindActionCreators(AreaActions, dispatch),
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
