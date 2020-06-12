import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
class Layout extends Component {
  render() {
    return (
      <div className="views">
        layout
        {renderRoutes(this.props.route.children)}
      </div>
    )
  }
}
export default Layout