import React from 'react';
import _map from 'lodash/map';
import ItemsGroup from './ItemsGroup';
import Header from '../utils/Header';

function ItemizedList({ classes, groups, items, title }) {
  return (
    <>
      <Header title={title} />
      {
        _map(groups, (group, i) => (
            <ItemsGroup
              key={i}
              items={group[items]}
              title={group.title}

            />
          )
        )
      }
    </>
  );
};

export default ItemizedList;
