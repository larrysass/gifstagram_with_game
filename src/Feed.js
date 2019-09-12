import React from 'react';
import Image from './Image'

export default class Feed extends React.Component {

    state={
        gifs: [],
        currentUser: {}
    }

    backToCanvas = () => {
        this.props.history.push('./canvas')
    }

    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/')
        // this.location.refresh()
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                currentUser: this.props.location.state.currentUser
            })
        } else {
            this.setState({
                currentUser: this.props.currentUser
            })}
        fetch('http://localhost:3000/gifs')
        .then(r => r.json())
        .then(gifs => {const filteredGifs = gifs.filter(gif => gif.likes.length > 0).reverse()
            this.setState({
            gifs: filteredGifs,
        })})
       
    }

    mostLiked = () => {
        const filteredGifs = this.state.gifs.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : 1)
        this.setState({
            gifs: filteredGifs
        })
    }

    newestGifs = () => {
        const filteredGifs = this.state.gifs.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)
        this.setState({
            gifs: filteredGifs
        })
    }

    render() {
        // console.log(this.props)
        console.log(this.state.currentUser)
        const gifs = this.state.gifs.map(gif => <Image key={gif.id} currentUser={this.state.currentUser} gif={gif} width={600}/>) 
        return (
          <div>
            <button onClick={this.handleClick} className="btn warning">Logout</button>
            <button onClick={this.backToCanvas} className="btn error">Back to Canvas</button>
            <button onClick={this.mostLiked} className="btn primary">Most Popular</button>
            <button onClick={this.newestGifs} className="btn success">Newest</button>
            {gifs}
          </div>
        );
      }
}