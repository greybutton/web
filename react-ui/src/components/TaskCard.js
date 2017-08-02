import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem, Label, ButtonToolbar, Button, Collapse, Row, Col } from 'react-bootstrap';

class TaskCard extends Component {
  state = { open: false };
  render() {
    const { task, deleteTask } = this.props;
    return (
      <ListGroupItem
        data-id={task._id}
        onDoubleClick={() => this.setState({ open: !this.state.open })}
        bsStyle={task.quadrant === 'first' ? 'danger' : task.quadrant === 'second' ? 'warning' : ''}
      >
        <div>
          <Label bsStyle="default">{task.time}</Label>&nbsp;
          {task.text}
        </div>
        <Collapse in={this.state.open}>
          <ButtonToolbar style={{ marginTop: 10, marginLeft: 0 }}>
            <Row>
              <Col xs={7} sm={8} md={9} lg={10}>
                <Link to={`/tasks/edit/${task._id}`}>
                  <Button>Edit</Button>
                </Link>
              </Col>
              <Col xs={5} sm={4} md={3} lg={2}>
                <Button bsStyle="danger" onClick={() => deleteTask(task._id)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </ButtonToolbar>
        </Collapse>
      </ListGroupItem>
    );
  }
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskCard;
