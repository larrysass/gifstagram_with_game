import React, { Component } from 'react';

export default class SignUpPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = (e) => {
    
    e.preventDefault()
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(r => r.json()).then(data => {
      if (data.token) {
        localStorage.token = data.token

        this.props.history.push('/canvas')

      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1 className="title" style={{fontSize: 300}}>Signup please</h1>
        <img src="https://i.pinimg.com/originals/67/4f/bf/674fbf76368bca2ebc0d06b7b5b5d29f.gif" 
          width='900'
          height='600' alt=""/>
        <form className="field">
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username" className="input"/>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"className="input"/>
          <input type="submit" value="Signup" onClick={this.handleSubmit} className="btn success"/>
        </form>
      </div>
    );
  }
}