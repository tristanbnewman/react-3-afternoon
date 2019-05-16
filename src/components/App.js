import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {

    let promise = axios.get("https://practiceapi.devmountain.com/api/posts")
    promise.then(response =>{
      this.setState({posts: response.data})
      console.log(this.state.posts)
    })
  }

  updatePost(post, text) {
    let promise = axios.put("https://practiceapi.devmountain.com/api/posts?id=" + post, {text})

    promise.then((response)=>{
      this.setState({posts: response.data})
    }).catch((error)=>{
      console.log(error)
    })
  }

  deletePost(post) {
    let promise = axios.delete('https://practiceapi.devmountain.com/api/posts?id='+post)

    promise.then(response=>{
      this.setState({posts: response.data})
    })
  }

  createPost(text) {
    let promise = axios.post('https://practiceapi.devmountain.com/api/posts',{text})

    promise.then(response=>{
      this.setState({posts: response.data})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {/* map over posts on state and render Post for each */}
          {this.state.posts.map((post, index)=>{
            return <Post 
            key={index} 
            text={post["text"]} 
            date={post["date"]} 
            updatePostFn={this.updatePost}
            id={post.id}
            deletePostFn={this.deletePost}
            />
          })}
          
        </section>
      </div>
    );
  }
}

export default App;
