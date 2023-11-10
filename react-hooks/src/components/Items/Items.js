import React, { useReducer, useEffect, useCallback } from 'react';

import ItemForm from './ItemForm';
import ItemList from './ItemList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const itemReducer = (currentItems, action) => {
  switch (action.type) {
    case 'SET':
      return action.items;
    case 'ADD':
      return [...currentItems, action.item];
    case 'DELETE':
      return currentItems.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not get there !');
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currentHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...currentHttpState, error: null };
    default:
      throw new Error('Should not be reached !');
  }
};

const Items = () => {
  const [userItems, dispatch] = useReducer(itemReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  // const [userItems, setUserItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING ITEMS', userItems);
  }, [userItems]);

  const filteredItemsHandler = useCallback((filteredItems) => {
    // setUserItems(filteredItems);
    dispatch({ type: 'SET', items: filteredItems });
  }, []);

  const addItemHandler = (item) => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch('https://c2c-firebase-1087f-default-rtdb.firebaseio.com/items.json', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: 'RESPONSE' });
        return response.json();
      })
      .then((responseData) => {
        // setUserItems((prevItems) => [
        //   ...prevItems,
        //   { id: responseData.name, ...item },
        // ]);
        dispatch({ type: 'ADD', item: { id: responseData.name, ...item } });
      });
  };

  const removeItemHandler = (itemId) => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch(
      `https://c2c-firebase-1087f-default-rtdb.firebaseio.com/items/${itemId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        dispatchHttp({ type: 'RESPONSE' });
        // setIsLoading(false);
        // setUserItems((prevItems) =>
        //   prevItems.filter((item) => item.id !== itemId)
        // );
        dispatch({ type: 'DELETE', id: itemId });
      })
      .catch((error) => {
        //   setError('Something is Wrong !');
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something is wrong !' });
      });
  };

  const clearError = () => {
    // setError(null);
    // setIsLoading(false);
    dispatch({ type: 'CLEAR' });
  };

  return (
    <div className='App'>
      {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
      {/* <ItemForm onAddItem={addItemHandler} loading={isLoading} /> */}
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <ItemForm onAddItem={addItemHandler} loading={httpState.loading} />
      <section>
        <Search onLoadItems={filteredItemsHandler} />
        <ItemList items={userItems} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
};

export default Items;
