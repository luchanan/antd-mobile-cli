import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { NavBar, Icon } from 'antd-mobile';
class Layout extends Component {
  render() {
    return (
      <div className="views">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >layout</NavBar>
        {renderRoutes(this.props.route.children)}
      </div>
    )
  }
}
export default Layout