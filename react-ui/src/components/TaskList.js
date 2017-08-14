/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import { Scrollbars } from 'react-custom-scrollbars';
import TaskCard from './TaskCard';
import TaskCardAllTab from './TaskCardAllTab';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }
  render() {
    const {
      importantTaskList,
      areaList,
      loading,
      updateTaskListImportantOrder,
      deleteTask,
      pickAreaTaskList,
      areaImportantTaskList,
    } = this.props;
    const allTabCardList = () =>
      importantTaskList.map(task =>
        <TaskCardAllTab key={task._id} task={task} areaList={areaList} deleteTask={deleteTask} />,
      );
    const navItemList = () =>
      areaList.map(area =>
        (<NavItem key={area._id} eventKey={area.title} onSelect={() => pickAreaTaskList(area._id)}>
          {area.title}
        </NavItem>),
      );
    const areaCardList = () =>
      areaImportantTaskList.map(task =>
        <TaskCard key={task._id} task={task} deleteTask={deleteTask} />,
      );
    const tabPaneList = () =>
      areaList.map(area =>
        (<Tab.Pane key={area._id} eventKey={area.title}>
          <ListGroup>
            {areaImportantTaskList.length === 0 ? '' : areaCardList()}
          </ListGroup>
        </Tab.Pane>),
      );
    const onEnd = evt =>
      new Promise((resolve, reject) =>
        updateTaskListImportantOrder({
          oldIndex: evt.oldIndex,
          newIndex: evt.newIndex,
          _id: evt.item.dataset.id,
          resolve,
          reject,
        }),
      ).catch((err) => {
        console.log(err);
      });
    const isImportantTaskListEmpty = () => importantTaskList.length === 0;
    const title = (
      <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>Task list</h4>
    );
    return (
      <Panel
        header={title}
        collapsible
        expanded={!isImportantTaskListEmpty() && this.state.expanded}
      >
        <Tab.Container id="tabs" defaultActiveKey="all" fill>
          <Row className="clearfix" style={{ marginLeft: 0, marginRight: 0 }}>
            <Col>
              <Nav bsStyle="tabs">
                <NavItem eventKey="all" onClick={() => pickAreaTaskList()}>
                  All
                </NavItem>
                {navItemList()}
              </Nav>
            </Col>
            <Col>
              <Scrollbars autoHeight autoHeightMax={430}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="all">
                    <ListGroup fill>
                      {loading
                        ? 'loading...'
                        : <Sortable
                          options={{
                            animation: 150,
                            onEnd,
                          }}
                        >
                          {allTabCardList()}
                        </Sortable>}
                    </ListGroup>
                  </Tab.Pane>
                  {tabPaneList()}
                </Tab.Content>
              </Scrollbars>
            </Col>
          </Row>
        </Tab.Container>
      </Panel>
    );
  }
}

TaskList.propTypes = {
  importantTaskList: PropTypes.array.isRequired,
  areaList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateTaskListImportantOrder: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  pickAreaTaskList: PropTypes.func.isRequired,
  areaImportantTaskList: PropTypes.array.isRequired,
};

export default TaskList;
