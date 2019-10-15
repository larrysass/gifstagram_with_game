import React from 'react'

export default class Comments extends React.Component{


    state = {
        newComment: '',
        comments: []
    }

    handleChange = (e) => {
        this.setState({
            newComment: e.target.value
        })
    }

    componentDidMount(){
        this.setState({
            comments: this.props.comments
        })
    }

    handleComment = (e) => {
        e.stopPropagation()
        e.preventDefault()
        
        const newComment = this.state.newComment
        fetch(`https://fast-sea-48558.herokuapp.com/comments`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                gif_id: this.props.gif.id,
                user_id: this.props.currentUser.id,
                content: newComment, 
                author: this.props.currentUser.username
            })
        }).then(r => r.json()).then(data => this.setState({
            comments: [...this.state.comments, data],
            newComment: ''
        }))
    }

    deleteClick = (e) => {
        const deletedComment = e.target.parentElement
        deletedComment.remove()
         
        console.log(deletedComment)
        fetch(`https://fast-sea-48558.herokuapp.com/comments/${e.target.value}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(r => r.json()).then()
    }


    render(){
        console.log(this.state.comments)
        const comments = this.state.comments.map(comment => <li style={{padding: 10}} key={comment.id}>{comment.content} - {comment.author} {this.props.currentUser.id === comment.user_id ? <button className="btn error" onClick={this.deleteClick}>X</button> : null}</li>)
        return(
            <div>
                <form onSubmit={this.handleComment} style={{padding: 20}} className="field">
                        <label style={{padding: 20}}>New Comment </label>
                        <input type="text" className="input" value={this.state.newComment} onChange={this.handleChange} />
                        <input type="submit" className="btn" />
                </form>
                <div className="container dark" style={{margin: 20}}>
                <p style={{padding: 20}}>comments:</p>
                    <ul>{comments}</ul></div>
            </div>
        )
    }
}