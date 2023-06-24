import React, { Component } from 'react'
import loading from '../spinner.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="" height="200"/>
      </div>
    )
  }
}
