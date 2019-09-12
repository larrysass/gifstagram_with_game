import React from 'react';
import Comments from './Comments'

export default class Image extends React.Component{

    state ={
        clicked: false,
        likes: [],
        comments: []
    }

    handleInfoClick = () => {
        this.setState({
          clicked: !this.state.clicked
        })
    }

    componentDidMount(){
        fetch(`http://localhost:3000/gifs/${this.props.gif.id}`).then(r => r.json()).then(data => 
        this.setState({
            likes: data.likes,
            comments: data.comments
        }))
    }

    handleLike = (e) => {
        e.stopPropagation()
        const currentUserId = this.props.currentUser.id
        const userLike = this.state.likes.filter(function(ele){
            return ele.user_id === currentUserId
        })
        if(this.state.likes.includes(userLike[0])){
            const newLikes = this.state.likes.filter(function(ele){
                return ele !== userLike[0]
            })
            this.setState({
                likes: newLikes
            })
            fetch(`http://localhost:3000/likes/${userLike[0].id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(r => r.json()).then()} else {
            fetch(`http://localhost:3000/likes`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    gif_id: this.props.gif.id,
                    user_id: this.props.currentUser.id
                })
            }).then(r => r.json()).then(data => this.setState({
                likes: [...this.state.likes, data]
            }))}
    }

    stopProp = (e) => {
        e.stopPropagation()
    }

    

    render(){
        // console.log(this.props.currentUser)
        return(
            <div onClick={this.handleInfoClick}>
                <img key={this.props.gif.id} src={this.props.gif.url} width={600} alt=""/>
                {this.state.clicked ? 
                <div onClick={this.stopProp} style={{padding: 10}}>
                    <button className="btn error" onClick={this.handleLike}>Like!</button><p style={{padding: 20}}>likes: {this.state.likes.length}</p>
                    <div>
                        <Comments gif={this.props.gif} comments={this.state.comments} currentUser={this.props.currentUser}/>
                    </div>
                </div>
                 : null}
            </div>
        )
    }
}