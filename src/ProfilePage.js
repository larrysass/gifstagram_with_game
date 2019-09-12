import React, { Component } from 'react';
import Image from './Image'
import {Link} from 'react-router-dom'

class ProfilePage extends Component {

  state = {
    currentUser: {},
    gifs: []
  }
  componentDidMount(){
    fetch('http://localhost:3000/profile',{
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
    })
    .then(res => res.json())
    .then(user => 
    fetch(`http://localhost:3000/users/${user.id}`).then(r => r.json()).then(data => this.setState({
      currentUser: data,
      gifs: data.likes
    }))
    )
  }

  handleClick = () => {
    localStorage.clear()
    // this.props.history.push('/')
    window.location.reload()
  }

  backToCanvas = () => {
    this.props.history.push('./canvas')
  }

  gotToFeed = () =>{
    this.props.history.push('./feed')
  }


  render() {
    
    const gifs = this.state.gifs.map(gif => <Image key={gif.id} gif={gif} width={600} currentUser={this.state.currentUser}/>) 
      console.log(this.state.currentUser)
    return (
      <div>
        <button className="btn warning" onClick={this.handleClick}>Logout</button>
        <Link to={{ path: 'feed', state: {currentUser: this.state.currentUser}}} ><button className="btn primary" onClick={this.gotToFeed} style={{width: 900}}>Go To Feed</button></Link>
        <button className="btn error" onClick={this.backToCanvas}>Back to Canvas</button><br></br>
        {
          this.state.currentUser.username ?
          <div className="title container"><h1>Welcome {this.state.currentUser.username}!</h1>
          <h2 >Your favorite gifs:</h2></div> :
          <h1>getting your info...</h1>
        }
        {gifs}
      </div>
    );
  }
}

export default ProfilePage;