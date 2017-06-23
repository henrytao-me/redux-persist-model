import React, { PureComponent } from 'react'

let rehyrated = false

let listeners = []
const addListener = (listener) => {
  if (rehyrated) {
    listener()
  } else {
    listeners.push(listener)
  }
}
const removeListener = (listener) => {
  const index = listeners.indexOf(listener)
  if (index >= 0) {
    listeners.slice(index, 1)
  }
}

export default class PersistModelProvider extends PureComponent {

  static rehydrated = () => {
    rehyrated = true
    listeners.forEach(listener => listener())
  }

  static reset = () => {
    rehyrated = false
    listeners = []
  }

  state = {
    ready: false
  }

  componentDidMount() {
    addListener(this._onReady)
  }

  componentWillUnmount() {
    removeListener(this._onReady)
  }

  render() {
    const { ready } = this.state
    if (!ready) {
      return null
    } else {
      return this.props.children
    }
  }

  _onReady = () => {
    this.setState({
      ready: true
    })
  }
}
