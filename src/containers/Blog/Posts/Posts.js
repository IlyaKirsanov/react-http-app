import React from 'react'
import axios from '../../../axios'
import Post from '../../../components/Post/Post'

import './Posts.css'

class Posts extends React.Component {
	state = {
		posts: []
	}

	componentDidMount() {
		console.log(this.props)
		axios.get('/posts')
			.then(response => {
				const posts = response.data.slice(0, 4)
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: 'Ilya'
					}
				})
				this.setState({
					posts: updatedPosts
				})
			})
			.catch(error => {
				console.log(error)
				//this.setState({ error: true })
			})
	}

	postSelectedHandler(id) {
		this.setState({
			selectedPostId: id
		})
	}

	render() {


		let posts = <p style={{ textAlign: 'center', color: 'red' }}>Something went wrong</p>

		if (!this.state.error) {
			posts = this.state.posts.map((post) => {
				return <Post
					clicked={() => this.postSelectedHandler(post.id)}
					key={post.id} title={post.title} author={post.author} />
			}
			)
		}
		return (
			<section className="Posts">
				{posts}
			</section>
		)

	}
}

export default Posts;