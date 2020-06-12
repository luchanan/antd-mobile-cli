import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">home</Link><br />
        <Link to="/login">login</Link><br />
        <Link to="/account/member">account-member</Link><br />
        <Link to="/account/member/36">account-member-id</Link><br />
        <Link to="/account/role">account-role</Link><br />
        <Link to="/account/member/36/404">404</Link><br />
        {renderRoutes(this.props.route.children)}
      </div>
    )
  }
}
