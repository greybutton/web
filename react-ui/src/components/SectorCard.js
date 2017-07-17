import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SectorCard = ({ sector }) =>
  (<div>
    <div>
      <p>
        {sector.title}
      </p>
      <p>
        {sector.score}
      </p>
      <p>
        {sector.desirableScore}
      </p>
    </div>
    <div>
      <div>
        <Link to={`/sector/edit/${sector._id}`}>
          <Button>Edit</Button>
        </Link>
        <Button bsStyle="danger">Delete</Button>
      </div>
    </div>
  </div>);

SectorCard.propTypes = {
  sector: PropTypes.object.isRequired,
};

export default SectorCard;
