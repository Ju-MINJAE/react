import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseFrom = () => {
  // const [enteredTitle, setEnteredTitle] = useState('');
  // const [enteredAmount, setEnteredAmount] = useState('');
  // const [enteredDate, setEnteredDate] = useState('');
  const [userInput, setUserInput] = useState({
    enterdTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  const titleChangeHandler = (event) => {
    //setEnteredTitle(event.target.value);
    setUserInput({ ...userInput, enterdTitle: event.target.value });
  };
  const amountChangeHandler = (event) => {
    //setEnteredAmount(event.target.value);
    setUserInput({ ...userInput, enteredAmount: event.target.value });
  };
  const dateChangeHandler = (event) => {
    //setEnteredDate(event.target.value);
    setUserInput({ ...userInput, enterdDate: event.target.value });
  };

  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' onChange={titleChangeHandler}></input>
        </div>
      </div>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            onChange={amountChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            step='2023-12-31'
            onChange={dateChangeHandler}
          />
        </div>
        <div className='new-expense__actions'>
          <button type='submit'>Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseFrom;
