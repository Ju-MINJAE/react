import React from 'react';

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING');
  return <p>{props.show ? 'This is new !' : ''}</p>;
};

// React.memo - 컴포넌트가 props로 동일한 결과를 렌더링하면,
// React는 컴포넌트를 재렌더링하지 않고 마지막으로 렌더링된 결과를 재사용함
// 즉, props가 이전과 다른 값이면 재렌더링하여 컴포넌트를 다시 만들어 반홤함.
export default React.memo(DemoOutput);
