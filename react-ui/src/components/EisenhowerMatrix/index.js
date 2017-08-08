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
      expandedFirstQuadrant: true,
      expandedSecondQuadrant: true,
      expandedThirdQuadrant: true,
      expandedFourthQuadrant: true,
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
    const titleFirstQuadrant = (
      <div
        onClick={() => this.setState({ expandedFirstQuadrant: !this.state.expandedFirstQuadrant })}
        style={{ fontSize: 14 }}
        role="button"
        tabIndex={0}
      >
        Urgent and Important
      </div>
    );
    const titleSecondQuadrant = (
      <div
        onClick={() =>
          this.setState({ expandedSecondQuadrant: !this.state.expandedSecondQuadrant })}
        style={{ fontSize: 14 }}
        role="button"
        tabIndex={-1}
      >
        Not Urgent and Important
      </div>
    );
    const titleThirdQuadrant = (
      <div
        onClick={() => this.setState({ expandedThirdQuadrant: !this.state.expandedThirdQuadrant })}
        style={{ fontSize: 14 }}
        role="button"
        tabIndex={-1}
      >
        Urgent and Not Important
      </div>
    );
    const titleFourthQuadrant = (
      <div
        onClick={() =>
          this.setState({ expandedFourthQuadrant: !this.state.expandedFourthQuadrant })}
        style={{ fontSize: 14 }}
        role="button"
        tabIndex={-1}
      >
        Not Urgent and Not Important
      </div>
    );
    return (
      <Panel header={title} collapsible expanded={this.state.expanded}>
        {loading
          ? 'loading...'
          : <div fill className="eisenhower-matrix">
            <Panel
              header={titleFirstQuadrant}
              bsStyle="danger"
              className="eisenhower-matrix__panel"
            >
              <ListGroup
                fill
                style={{ display: this.state.expandedFirstQuadrant ? 'block' : 'none' }}
              >
                {cardList('first')}
              </ListGroup>
            </Panel>
            <Panel
              header={titleSecondQuadrant}
              bsStyle="warning"
              className="eisenhower-matrix__panel"
            >
              <ListGroup
                fill
                style={{ display: this.state.expandedSecondQuadrant ? 'block' : 'none' }}
              >
                {cardList('second')}
              </ListGroup>
            </Panel>
            <Panel header={titleThirdQuadrant} className="eisenhower-matrix__panel">
              <ListGroup
                fill
                style={{ display: this.state.expandedSecondQuadrant ? 'block' : 'none' }}
              >
                {cardList('third')}
              </ListGroup>
            </Panel>
            <Panel header={titleFourthQuadrant} className="eisenhower-matrix__panel">
              <ListGroup
                fill
                style={{ display: this.state.expandedFourthQuadrant ? 'block' : 'none' }}
              >
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
