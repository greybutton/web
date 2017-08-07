/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup } from 'react-bootstrap';
import Sortable from 'react-sortablejs';
import AreaCard from './AreaCard';

class AreaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  render() {
    const { areaList, loading, updateAreaListOrder } = this.props;
    const cardList = () => areaList.map(area => <AreaCard key={area._id} area={area} />);
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
    const title = (
      <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>The wheel of life</h4>
    );
    return (
      <Panel header={title} collapsible expanded={this.state.expanded}>
        <ListGroup fill>
          {loading
            ? 'loading...'
            : <Sortable
              options={{
                animation: 150,
                onEnd,
              }}
            >
              {cardList()}
            </Sortable>}
        </ListGroup>
      </Panel>
    );
  }
}

AreaList.propTypes = {
  areaList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateAreaListOrder: PropTypes.func.isRequired,
};

export default AreaList;
