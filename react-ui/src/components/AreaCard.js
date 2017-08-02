import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar, ListGroupItem, Button, Collapse } from 'react-bootstrap';

class AreaCard extends Component {
  state = { open: false };
  render() {
    const { area } = this.props;
    return (
      <ListGroupItem
        data-id={area._id}
        onDoubleClick={() => this.setState({ open: !this.state.open })}
        style={{ paddingTop: 0 }}
      >
        <h4>
          {area.title}
        </h4>
        <ProgressBar style={{ marginBottom: 10 }}>
          <ProgressBar
            min={0}
            max={10}
            now={area.score}
            bsStyle="success"
            label={`${area.score}/10 score`}
            key={1}
          />
          <ProgressBar
            min={0}
            max={10}
            now={area.desirableScore - area.score}
            bsStyle="info"
            label={`${area.desirableScore}/10 desirable score`}
            key={2}
          />
        </ProgressBar>
        <Collapse in={this.state.open}>
          <div>
            <Link to={`/areas/edit/${area._id}`}>
              <Button>Edit</Button>
            </Link>
          </div>
        </Collapse>
      </ListGroupItem>
    );
  }
}

AreaCard.propTypes = {
  area: PropTypes.object.isRequired,
};

export default AreaCard;
