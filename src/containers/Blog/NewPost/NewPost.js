import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: 'Max',
        submited: false
    }

    componentDidMount() {
        // if unauth => this.props.history.replace('/posts')
        console.log(this.props)
    }

    postDataHandler() {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        }

        axios.post('/posts', data)
            .then(response => {
                console.log(response)
                this.setState({ submited: true })
            })
    }

    render() {
        let redirect = null;
        if (this.state.submited) {
            redirect = <Redirect to="/posts/" />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Body</label>
                <textarea rows="4" value={this.state.body} onChange={(event) => this.setState({ body: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler.bind(this)}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;