import React from 'react';

function AddUser(props) {
  const addUserHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={addUserHandler}>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' />
        <label htmlFor='age'>Age (Years)</label>
        <input id='age' type='number' />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
