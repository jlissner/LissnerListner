import React from 'react';
import _map from 'lodash/map';
import ItemsGroup from './ItemsGroup';


class ItemizedList extends React.Component {
  render() {
    const { groups, items, title } = this.props;

    return (
      <React.Fragment>
        {
          _map(groups, (group, i) => (
              <ItemsGroup
                key={i}
                items={group[items]}
                title={`${group.title} ${title}`}

              />
            )
          )
        }
      </React.Fragment>
    );
  }
};

export default ItemizedList;
