import React from 'react';
import { Panel, ListGroup, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import TaskCard from './TaskCard';

const TaskList = ({
  importantTaskList,
  areaList,
  loading,
  updateTaskListImportantOrder,
  deleteTask,
  pickAreaTaskList,
  areaTaskList,
}) => {
  const cards = () =>
    importantTaskList.map(task => <TaskCard key={task._id} task={task} deleteTask={deleteTask} />);
  const navItems = () =>
    areaList.map(area =>
      (<NavItem key={area._id} eventKey={area.title} onSelect={() => pickAreaTaskList(area._id)}>
        {area.title}
      </NavItem>),
    );
  const tabPanes = () =>
    areaList.map(area =>
      (<Tab.Pane key={area._id} eventKey={area.title}>
        <ListGroup>
          {areaTaskList.length === 0 ? '' : areaCards()}
        </ListGroup>
      </Tab.Pane>),
    );
  const areaCards = () =>
    areaTaskList.map(task => <TaskCard key={task._id} task={task} deleteTask={deleteTask} />);
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
  return (
    <Panel header="List of Tasks">
      <Tab.Container id="tabs" defaultActiveKey="all" fill>
        <Row className="clearfix" style={{ marginLeft: 0, marginRight: 0 }}>
          <Col>
            <Nav bsStyle="tabs">
              <NavItem eventKey="all" onClick={() => pickAreaTaskList()}>
                All
              </NavItem>
              {navItems()}
            </Nav>
          </Col>
          <Col>
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
                      {cards()}
                    </Sortable>}
                </ListGroup>
              </Tab.Pane>
              {tabPanes()}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Panel>
  );
};

export default TaskList;
