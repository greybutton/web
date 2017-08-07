import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as AreaActions from '../actions/AreaActions';
import * as TaskActions from '../actions/TaskActions';
import AreaList from '../components/AreaList';
import TaskList from '../components/TaskList';
import DailyTaskList from '../components/DailyTaskList';
import EisenhowerMatrix from '../components/EisenhowerMatrix/';

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
        <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
          <DailyTaskList
            dailyTaskList={this.props.dailyTaskList}
            areaList={this.props.areaList}
            loading={this.props.loadingTask}
            deleteTask={this.props.TaskActions.deleteTask}
            updateTaskListDailyOrder={this.props.TaskActions.updateTaskListDailyOrder}
          />
          <TaskList
            importantTaskList={this.props.importantTaskList}
            areaList={this.props.areaList}
            areaTaskList={this.props.areaTaskList}
            loading={this.props.loadingTask}
            deleteTask={this.props.TaskActions.deleteTask}
            updateTaskListImportantOrder={this.props.TaskActions.updateTaskListImportantOrder}
            pickAreaTaskList={this.props.TaskActions.pickAreaTaskList}
          />
        </Col>
        <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
          <AreaList
            areaList={this.props.areaList}
            loading={this.props.loadingArea}
            updateAreaListOrder={this.props.AreaActions.updateAreaListOrder}
          />
          <EisenhowerMatrix
            allTaskList={this.props.allTaskList}
            loading={this.props.loadingTask}
            areaTaskList={this.props.areaTaskList}
            deleteTask={this.props.TaskActions.deleteTask}
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
    dailyTaskList: state.taskStore.dailyTaskList,
    importantTaskList: state.taskStore.importantTaskList,
    allTaskList: state.taskStore.allTaskList,
    areaTaskList: state.taskStore.areaTaskList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AreaActions: bindActionCreators(AreaActions, dispatch),
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

HomePage.propTypes = {
  loadingArea: PropTypes.bool.isRequired,
  loadingTask: PropTypes.bool.isRequired,
  areaList: PropTypes.array.isRequired,
  dailyTaskList: PropTypes.array.isRequired,
  importantTaskList: PropTypes.array.isRequired,
  allTaskList: PropTypes.array.isRequired,
  areaTaskList: PropTypes.array.isRequired,
  AreaActions: PropTypes.object.isRequired,
  TaskActions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
