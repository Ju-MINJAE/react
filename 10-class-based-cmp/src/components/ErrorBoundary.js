import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong !</p>;
    }
    return this.props.children;
    // 오류 경계 컴포넌트를 우리가 보호하려고 하는 컴포넌트로 둘러싸야 하기 떄문
  }
}

export default ErrorBoundary;
