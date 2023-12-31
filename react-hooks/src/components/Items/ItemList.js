import React from 'react';

import './ItemList.css';

const ItemList = (props) => {
  return (
    <section className='ingredient-list'>
      <h2>Loaded Items</h2>
      <ul>
        {props.items.map((ig) => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
