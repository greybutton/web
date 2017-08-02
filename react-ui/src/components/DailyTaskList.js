import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import DailyTaskCard from './DailyTaskCard';

const DailyTaskList = ({
  dailyTaskList,
  areaList,
  loading,
  updateTaskListDailyOrder,
  deleteTask,
}) => {
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
  return (
    <Panel header="Daily list of tasks" collapsible defaultExpanded>
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
};

export default DailyTaskList;
