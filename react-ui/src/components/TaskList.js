import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import TaskCard from './TaskCard';

const TaskList = ({ importantTaskList, loading, updateTaskListImportantOrder, deleteTask }) => {
  const cards = () =>
    importantTaskList.map(task => <TaskCard key={task._id} task={task} deleteTask={deleteTask} />);
  const onEnd = evt =>
    new Promise((resolve, reject) =>
      updateTaskListImportantOrder({
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
