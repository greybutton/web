import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem, Label, ButtonToolbar, Button, Collapse, Row, Col } from 'react-bootstrap';

class DailyTaskCard extends Component {
  state = { open: false };
  label = (task, areaList) => {
    const area = areaList.filter(areaItem => areaItem._id === task.area)[0];
    return area.title;
  };
  render() {
    const { task, areaList, deleteTask } = this.props;
    return (
      <ListGroupItem
        data-id={task._id}
        onDoubleClick={() => this.setState({ open: !this.state.open })}
      >
        <div>
          <Label bsStyle="default">{task.time}</Label>&nbsp;
          <Label bsStyle="default">{this.label(task, areaList)}</Label>&nbsp;
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

DailyTaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default DailyTaskCard;
