import React from 'react'
import SearchBar from './SearchBar'
import { Link, Route } from 'react-router-dom'
import Feed from './Feed'
import ProfilePage from './ProfilePage';
import Game from './Game.js'

export default class Canvas extends React.Component{

    state = {
        currentUser: {},
        clicked: false
    }
    gameClick = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    componentDidMount(){
        fetch('https://fast-sea-48558.herokuapp.com/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
        })
        .then(res => res.json())
        .then(user => this.setState({
            currentUser: user
        }))
    }

    handleLike = () => {
        fetch('https://fast-sea-48558.herokuapp.com/gifs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
              url: this.props.currentGif
          }
      )
    }).then(r => r.json()).then(data => {
        fetch('https://fast-sea-48558.herokuapp.com/likes', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
             gif_id: data.id,
             user_id: this.state.currentUser.id   
            })
        }).then(r => r.json()).then(console.log)})}
    

    profileButton = () => {
        this.props.history.push('./profile')
    }

    // gotToFeed = () =>{
    //     this.props.history.push('./feed')
    // }


    render(){
        console.log(this.state.currentUser)
        const image = `${this.props.currentGif}`
        return(
        <div id="phaserContainer">
            <h1> Click for the next GIF! </h1>
            <p>Hit 'like' to save the GIF to your PROFILE, and FEED to see what everybody is liking!</p>
            <canvas onClick={this.props.handleClick}
            ref="canvas"
            width='900'
            height='600'
            // tabIndex="0" 
            style={{ backgroundImage: `url(${image})`}} 
            className={this.props.currentCursor}/>
            <button onClick={this.handleLike} className="btn error">Like</button>
            <SearchBar handleSearch={this.props.handleSearch} handleCursor={this.props.handleCursor}/>
            
            <button onClick={this.handleClick} className="btn warning">Logout</button>
            <Link to={{pathname:"/profile", state: {currentUser: this.state.currentUser}}}>
            <button className="btn primary" style={{width: 900}}>Go To Profile</button>
            <Route path={'/profile'} render={routerProps => <ProfilePage {...routerProps} currentUser={this.state.currentUser}/>}/>
            </Link>
            <Link to={{pathname:"/feed", state: {currentUser: this.state.currentUser}}}>
            <button className="btn success" style={{width: 900}}>Go To Feed</button>
            <Route path={'/feed'} render={routerProps => <Feed {...routerProps} currentUser={this.state.currentUser}/>}/>
            </Link>
            {/* {, backgroundSize: 'cover'} */}
            {this.state.clicked? <Game url={this.props.currentGif}/>:null}
        </div>
        )
    }
}

