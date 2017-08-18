/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar, ListGroupItem, Button, Collapse } from 'react-bootstrap';
import Tappable from 'react-tappable';

class AreaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const { area } = this.props;
    return (
      <ListGroupItem
        className="area__card"
        data-id={area._id}
        onDoubleClick={() => this.setState({ open: !this.state.open })}
      >
        <Tappable
          pressDelay="500"
          onPress={() => this.setState({ open: !this.state.open })}
          onMouseDown={() => false}
        >
          <h4>
            {area.title}
          </h4>
          <ProgressBar className="area__progressbar">
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
        </Tappable>
      </ListGroupItem>
    );
  }
}

AreaCard.propTypes = {
  area: PropTypes.object.isRequired,
};

export default AreaCard;
