import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import DailyTaskCard from './DailyTaskCard';

class DailyTaskList extends Component {
  state = {
    expanded: true,
  };
  render() {
    const { dailyTaskList, areaList, loading, updateTaskListDailyOrder, deleteTask } = this.props;
    const cards = () =>
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
      ).catch(err => {
        console.log(err);
      });
    const countTime = () => {
      let hours = 0;
      let minutes = 0;
      dailyTaskList.forEach(task => {
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
    const isDailyTaskListEmpty = () => {
      return dailyTaskList.length === 0 ? true : false;
    };
    const title = (
      <h3 onClick={() => this.setState({ expanded: !this.state.expanded })}>Daily task list</h3>
    );
    return (
      <Panel header={title} collapsible expanded={!isDailyTaskListEmpty() && this.state.expanded}>
        <ListGroup fill>
          {loading
            ? 'loading...'
            : <div>
                <ListGroupItem bsStyle="info">
                  Total time on daily tasks {countTime().hours}h {countTime().minutes}m
                </ListGroupItem>
                <Sortable
                  options={{
                    animation: 150,
                    onEnd,
                  }}
                >
                  {cards()}
                </Sortable>
              </div>}
        </ListGroup>
      </Panel>
    );
  }
}

export default DailyTaskList;
