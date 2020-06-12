import React, { Component } from 'react'
class Member extends Component {
  render() {
    return (
      <div className="Member">
        Member-Route Info：{JSON.stringify(this.props.match)}
      </div>
    )
  }
}
export default Member