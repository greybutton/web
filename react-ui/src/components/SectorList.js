import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import SectorCard from './SectorCard';

const SectorList = ({ sectors, loading }) => {
  const cards = () => sectors.map(sector => <SectorCard key={sector._id} sector={sector} />);
  return (
    <Panel header="List of Sectors">
      <ListGroup fill>
        {loading ? 'loading...' : cards()}
      </ListGroup>
    </Panel>
  );
};

export default SectorList;
