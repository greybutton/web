/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem, Label, ButtonToolbar, Button, Collapse, Row, Col } from 'react-bootstrap';
import Tappable from 'react-tappable';

class EisenhowerMatrixCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const { task, deleteTask } = this.props;
    return (
      <ListGroupItem data-id={task._id} onClick={() => this.setState({ open: !this.state.open })}>
        <Tappable
          pressDelay="500"
          onPress={() => this.setState({ open: !this.state.open })}
          onMouseDown={() => false}
        >
          <div>
            <Label bsStyle="default">{task.time}</Label>&nbsp;
            {task.text}
          </div>
          <Collapse in={this.state.open}>
            <ButtonToolbar className="task-card__buttong-group">
              <Row>
                <Col xs={7} sm={8} md={7} lg={8}>
                  <Link to={`/tasks/edit/${task._id}`}>
                    <Button>Edit</Button>
                  </Link>
                </Col>
                <Col xs={5} sm={4} md={5} lg={4}>
                  <Button bsStyle="danger" onClick={() => deleteTask(task._id)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </ButtonToolbar>
          </Collapse>
        </Tappable>
      </ListGroupItem>
    );
  }
}

EisenhowerMatrixCard.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EisenhowerMatrixCard;
