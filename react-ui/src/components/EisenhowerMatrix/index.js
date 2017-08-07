/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup } from 'react-bootstrap';
import EisenhowerMatrixCard from '../EisenhowerMatrixCard';

import './index.css';

class EisenhowerMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  render() {
    const { allTaskList, areaTaskList, loading, deleteTask } = this.props;
    const cardList = (quadrant) => {
      if (areaTaskList.length === 0) {
        return allTaskList
          .filter(task => task.quadrant === quadrant)
          .map(task => <EisenhowerMatrixCard key={task._id} task={task} deleteTask={deleteTask} />);
      }
      return areaTaskList
        .filter(task => task.quadrant === quadrant)
        .map(task => <EisenhowerMatrixCard key={task._id} task={task} deleteTask={deleteTask} />);
    };
    const title = (
      <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>
        The Eisonhower matrix
      </h4>
    );
    return (
      <Panel header={title} collapsible expanded={this.state.expanded}>
        {loading
          ? 'loading...'
          : <div fill className="eisenhower-matrix">
            <Panel
              header="Urgent and Important"
              bsStyle="danger"
              className="eisenhower-matrix__panel"
            >
              <ListGroup fill>
                {cardList('first')}
              </ListGroup>
            </Panel>
            <Panel
              header="Not Urgent and Important"
              bsStyle="warning"
              className="eisenhower-matrix__panel"
            >
              <ListGroup fill>
                {cardList('second')}
              </ListGroup>
            </Panel>
            <Panel header="Urgent and Not Important" className="eisenhower-matrix__panel">
              <ListGroup fill>
                {cardList('third')}
              </ListGroup>
            </Panel>
            <Panel header="Not Urgent and Not Important" className="eisenhower-matrix__panel">
              <ListGroup fill>
                {cardList('fourth')}
              </ListGroup>
            </Panel>
          </div>}
      </Panel>
    );
  }
}

EisenhowerMatrix.propTypes = {
  allTaskList: PropTypes.array.isRequired,
  areaTaskList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EisenhowerMatrix;
