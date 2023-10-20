import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {
  // componentWillUnmount - 컴포넌트가 제거되기 직전에 호출
  componentWillUnmount() {
    console.log('USER WILL UNMOUNT !');
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
