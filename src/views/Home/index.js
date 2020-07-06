import React, { Component } from 'react'
// import axios from 'axios'
import '@/components/Icon/iconfont.css'
import './index.less'
window.WILLBEREPLACE = 'JSREPLACE' // JS先被处理window.WILLBEREPLACE = "JSREPLACE", 然后/"HEHEHE"/g代替"JSREPLACE"
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