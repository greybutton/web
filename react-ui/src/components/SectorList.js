import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import SectorCard from './SectorCard';

const SectorList = ({ sectors, loading, updateSectorOrder }) => {
  const cards = () => sectors.map(sector => <SectorCard key={sector._id} sector={sector} />);
  const onEnd = evt =>
    new Promise((resolve, reject) =>
      updateSectorOrder({
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
    <Panel header="List of Sectors">
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

export default SectorList;
