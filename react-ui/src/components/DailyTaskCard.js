/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem, Label, ButtonToolbar, Button, Collapse, Row, Col } from 'react-bootstrap';
import Tappable from 'react-tappable';

class DailyTaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const label = (task, areaList) => {
      const area = areaList.filter(areaItem => areaItem._id === task.area)[0];
      return area.title;
    };
    const { task, areaList, deleteTask } = this.props;
    return (
      <ListGroupItem
        data-id={task._id}
        onDoubleClick={() => this.setState({ open: !this.state.open })}
      >
        <Tappable
          pressDelay="500"
          onPress={() => this.setState({ open: !this.state.open })}
          onMouseDown={() => false}
        >
          <div>
            <Label bsStyle="default">{task.time}</Label>&nbsp;
            <Label bsStyle="default">{label(task, areaList)}</Label>&nbsp;
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
        </Tappable>
      </ListGroupItem>
    );
  }
}

DailyTaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  areaList: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default DailyTaskCard;
