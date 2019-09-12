import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <div>
        <h1 id="gifLogo" style={{fontSize: 300}}>Gifstagram</h1>
        <p>powered by:</p>
        <img src="https://fortunedotcom.files.wordpress.com/2016/02/giphy-3.gif" 
          width='900'
          height='600' alt=""/>
        <ul id="main-menu">
        <Link to="/login" ><button className="btn error">Go to Login</button></Link>
        <Link to="/signup" ><button className="btn primary">Go to Signup</button></Link>
        </ul>
      </div>
    );
  }
}

export default HomePage;