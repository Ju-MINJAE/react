import React, { useState, useCallback } from 'react';

import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('APP RUNNING');

  // useCallbak() - 특정 함수를 새로 만들지 않고 재사용할때 사용
  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);
  // allowToggle 값이 바뀌고 새로운 값이 들어오면 함수를 재생성하고,
  // 새로 만든 함수를 저장 -> 항상 allowToggle의 최신 값만을 사용
  // allowToggle값이 변경되지 않는다면 함수를 재생성 하지 않음.

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggling !</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph !</Button>
    </div>
  );
}

export default App;
