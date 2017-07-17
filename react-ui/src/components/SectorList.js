import React from 'react';
import SectorCard from './SectorCard';

const SectorList = ({ sectors, loading }) => {
  const cards = () => sectors.map(sector => <SectorCard key={sector._id} sector={sector} />);
  return (
    <div>
      {loading ? 'loading...' : cards()}
    </div>
  );
};

export default SectorList;
