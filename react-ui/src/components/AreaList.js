import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import AreaCard from './AreaCard';

const AreaList = ({ areaList, loading, updateAreaListOrder }) => {
  const cards = () => areaList.map(area => <AreaCard key={area._id} area={area} />);
  const onEnd = evt =>
    new Promise((resolve, reject) =>
      updateAreaListOrder({
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
    <Panel header="The wheel of life">
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

export default AreaList;
