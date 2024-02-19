import { useEffect, useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState('');

  const onClick = () => setCounter((prev) => prev + 1);

  const onChange = (event) => {
    setKeyword(event.target.value);
  };

  // useEffect function은 코가 딱 한번만 실행될 수 있도록 보호
  useEffect(() => {
    console.log('I run only once.');
  }, []);
  useEffect(() => {
    console.log(`I run when 'keyword' changes.`);
  }, [keyword]);
  useEffect(() => {
    console.log(`I run when 'counter' changes.`);
  }, [counter]);
  useEffect(() => {
    console.log(`I run when 'keyword' & 'counter' changes.`);
  }, [keyword, counter]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type='text'
        placeholder='Search here'
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
