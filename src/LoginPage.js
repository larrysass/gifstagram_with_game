import React, { Component } from 'react';

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.token = data.token

        this.props.history.push('/canvas')

      }
    })
  }

  handleClick = () => {
    this.props.history.push('./signup')
  }

  render() {
    return (
      <div>
        <h1 className="title" style={{fontSize: 300}}>Log in please</h1>
        <img src="https://gifimage.net/wp-content/uploads/2018/04/log-gif-5.gif" 
          width='900'
          height='600' alt=""/>
        <form onSubmit={this.handleSubmit} className="field">
          <input onChange={this.handleChange} value={this.state.username} placeholder="username" type="text"  name="username" className="input"/>
          <input onChange={this.handleChange} value={this.state.password} placeholder="password"type="password" name="password" className="input"/>
          <input type="submit" style={{width: 900}} className="btn success" value="Log in"/>
        </form>
          <button onClick={this.handleClick} style={{width: 900}} className="btn error">Sign Up</button>
      </div>
    );
  }
}

export default LoginPage;