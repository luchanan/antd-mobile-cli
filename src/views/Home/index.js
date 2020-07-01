import React, { Component } from 'react'
// import axios from 'axios'
import '@/components/Icon/iconfont.css'
import './index.less'
class Home extends Component {
  componentDidMount () {
    // axios.post('/tm/api/login').then(res => {
    //   console.log(`proxy test:` + JSON.stringify(res.data.data))
    // })
  }
  render() {
    return (
      <div className="home">
        home
        <span className="iconfont iconreact blue"></span>
        <div className="logo"></div>
      </div>
    )
  }
}
export default Home