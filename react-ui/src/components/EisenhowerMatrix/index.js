import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import EisenhowerMatrixCard from '../EisenhowerMatrixCard';

import './index.css';

const EisenhowerMatrix = ({ matrixTaskList, areaTaskList, loading, deleteTask }) => {
  const cards = (quadrant) => {
    if (areaTaskList.length === 0) {
      return matrixTaskList
        .filter(task => task.quadrant === quadrant)
        .map(task => <EisenhowerMatrixCard key={task._id} task={task} deleteTask={deleteTask} />);
    }
    return areaTaskList
      .filter(task => task.quadrant === quadrant)
      .map(task => <EisenhowerMatrixCard key={task._id} task={task} deleteTask={deleteTask} />);
  };
  return (
    <Panel header="The Eisonhower matrix" collapsible>
      {loading
        ? 'loading...'
        : <div fill className="eisenhower-matrix">
          <Panel
            header="Urgent and Important"
            bsStyle="danger"
            className="eisenhower-matrix__panel"
          >
            <ListGroup fill>
              {cards('first')}
            </ListGroup>
          </Panel>
          <Panel
            header="Not Urgent and Important"
            bsStyle="warning"
            className="eisenhower-matrix__panel"
          >
            <ListGroup fill>
              {cards('second')}
            </ListGroup>
          </Panel>
          <Panel header="Urgent and Not Important" className="eisenhower-matrix__panel">
            <ListGroup fill>
              {cards('third')}
            </ListGroup>
          </Panel>
          <Panel header="Not Urgent and Not Important" className="eisenhower-matrix__panel">
            <ListGroup fill>
              {cards('fourth')}
            </ListGroup>
          </Panel>
        </div>}
    </Panel>
  );
};

export default EisenhowerMatrix;
