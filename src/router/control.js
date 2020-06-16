// 路由钩子
import React from 'react'
import { Redirect } from 'react-router'
import {renderAsyncComponent} from '@/components/AsyncComponent'
class Control extends React.Component {
  componentDidMount () {
    console.log(`onEnter:${JSON.stringify(this.props.route)}`)
  }
  componentDidUpdate () {
    console.log(`onUpdate:${this.props.route.path}`)
  }
  componentWillUnmount () {
    console.log(`onLeave:${this.props.route.path}`)
  }
  render() {
    const { component } = this.props.route
    let props = {...this.props, showLoading: true}
    const RenderComponent = () => renderAsyncComponent(props, component)
    return (
      <div>
        {!window.isAuth ? <RenderComponent /> : <Redirect to="/403"/>}
      </div>
    )
  }
}
export default Control