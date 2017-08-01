import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem, Label, ButtonToolbar, Button, Collapse } from 'react-bootstrap';

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
            <Link to={`/tasks/edit/${task._id}`}>
              <Button>Edit</Button>
            </Link>
            <Button bsStyle="danger" onClick={() => deleteTask(task._id)}>
              Delete
            </Button>
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
