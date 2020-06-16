import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Button, Flex } from 'antd-mobile';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {txt: 'set all router 403'};
  }
  auth () {
    if (window.isAuth) {
      window.isAuth = false
      this.setState({txt: 'set all router 403'});
    } else {
      window.isAuth = true
      this.setState({txt: 'remove all router 403'});
    }
  }
  render() {
    return (
      <div>
        <Flex>
          <Flex.Item><Link to="/">home</Link></Flex.Item>
          <Flex.Item><Link to="/login">login</Link></Flex.Item>
          <Flex.Item><Link to="/account/member">account-member</Link></Flex.Item>
          <Flex.Item><Link to="/account/member/36">account-member-id</Link></Flex.Item>
          <Flex.Item><Link to="/account/role">account-role</Link></Flex.Item>
          <Flex.Item><Link to="/account/member/36/404">404</Link></Flex.Item>
          <Flex.Item><Link to="/403">403</Link></Flex.Item>
    <Flex.Item><Button type="primary" onClick={(event) => this.auth()}>{this.state.txt}</Button></Flex.Item>
        </Flex>
        {renderRoutes(this.props.route.children)}
      </div>
    )
  }
}
