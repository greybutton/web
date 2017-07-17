import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar, ListGroupItem, Button } from 'react-bootstrap';

class SectorCard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }
  render() {
    const { sector } = this.props;
    return (
      <ListGroupItem onDoubleClick={() => this.setState({ open: !this.state.open })}>
        <h4>
          {sector.title}
        </h4>
        <ProgressBar>
          <ProgressBar
            min={0}
            max={10}
            now={sector.score}
            bsStyle="success"
            label={`${sector.score}/10 score`}
            key={1}
          />
          <ProgressBar
            min={0}
            max={10}
            now={sector.desirableScore - sector.score}
            bsStyle="info"
            label={`${sector.desirableScore}/10 desirable score`}
            key={2}
          />
        </ProgressBar>
        <Link to={`/sector/edit/${sector._id}`} hidden={this.state.open}>
          <Button>Edit</Button>
        </Link>
      </ListGroupItem>
    );
  }
}

SectorCard.propTypes = {
  sector: PropTypes.object.isRequired,
};

export default SectorCard;
