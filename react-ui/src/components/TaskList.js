import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import TaskCard from './TaskCard';

const TaskList = ({ importantTasks, sectors, loading, updateImportantTasksOrder }) => {
  const cards = () => importantTasks.map(task => <TaskCard key={task._id} task={task} />);
  const onEnd = evt =>
    new Promise((resolve, reject) =>
      updateImportantTasksOrder({
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex,
        _id: evt.item.dataset.id,
        resolve,
        reject,
      }),
    ).catch((err) => {
      console.log(err);
    });
  return (
    <Panel header="List of Tasks">
      <ListGroup fill>
        {loading
          ? 'loading...'
          : <Sortable
            options={{
              animation: 150,
              onEnd,
            }}
          >
            {cards()}
          </Sortable>}
      </ListGroup>
    </Panel>
  );
};

export default TaskList;
