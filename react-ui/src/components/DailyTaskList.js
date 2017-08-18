/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import { Scrollbars } from 'react-custom-scrollbars';
import DailyTaskCard from './DailyTaskCard';

class DailyTaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }
  render() {
    const { dailyTaskList, areaList, loading, updateTaskListDailyOrder, deleteTask } = this.props;
    const cardList = () =>
      dailyTaskList.map(task =>
        <DailyTaskCard key={task._id} task={task} areaList={areaList} deleteTask={deleteTask} />,
      );
    const onEnd = evt =>
      new Promise((resolve, reject) =>
        updateTaskListDailyOrder({
          oldIndex: evt.oldIndex,
          newIndex: evt.newIndex,
          _id: evt.item.dataset.id,
          resolve,
          reject,
        }),
      ).catch((err) => {
        console.log(err);
      });
    const countTime = () => {
      let hours = 0;
      let minutes = 0;
      dailyTaskList.forEach((task) => {
        const time = task.time.split(/:|-|;|\*|#/);
        hours += parseInt(time[0], 10);
        minutes += parseInt(time[1], 10);
      });
      if (minutes >= 60) {
        hours += parseInt(minutes / 60, 10);
        minutes %= 60;
      }
      return { hours, minutes };
    };
    const isDailyTaskListEmpty = () => dailyTaskList.length === 0;
    const title = (
      <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>Daily task list</h4>
    );
    return (
      <Panel header={title} collapsible expanded={!isDailyTaskListEmpty() && this.state.expanded}>
        <ListGroup fill>
          <Scrollbars autoHeight autoHeightMax={250}>
            {loading
              ? 'loading...'
              : <div>
                <ListGroupItem bsStyle="info">
                    Total time on daily tasks {countTime().hours}h {countTime().minutes}m
                  </ListGroupItem>
                <Sortable
                  options={{
                    animation: 150,
                    delay: 50,
                    onEnd,
                  }}
                >
                  {cardList()}
                </Sortable>
              </div>}
          </Scrollbars>
        </ListGroup>
      </Panel>
    );
  }
}

DailyTaskList.propTypes = {
  dailyTaskList: PropTypes.array.isRequired,
  areaList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateTaskListDailyOrder: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default DailyTaskList;
