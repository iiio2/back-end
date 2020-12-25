import React, { Component } from 'react';
import MoviesList from "./components/MoviesList";
import axios from "axios"; 

import config from './config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.interceptors.response.use(null, error=>{
  const expectedError = 
  error.response && 
  error.response.status >= 400 && 
  error.response.status < 500;

  if(!expectedError){
    console.log("Logging error", error); 
    toast.error('An unexpected error occured!');  
  }

  return Promise.reject(error);

});


class App extends Component {
  state = { 
    posts:[],
   };

  //  Fetch Data
   async componentDidMount(){
    const { data: posts } = await axios.get(config.apiEndpoint);

    this.setState({
      posts,
    })
   }


  //  Add Data 
  handleAdd = async () => {
    const obj = {title:'a',body:'b', id:101}; 
    const { data: post } = await axios.post(config.apiEndpoint, obj); 
    const posts =[post, ...this.state.posts];
    this.setState({ posts })
    toast.success("Post added");  
  }

  // Update Data 
  handleUpdate = async post => {
    post.title = "Updated"; 
    await axios.put(config.apiEndpoint + '/' + post.id, post); 

    const posts = [...this.state.posts]; 
    const index = posts.indexOf(post); 
    posts[index] = {...post}; 
    this.setState({
      posts, 
    })
  }

  // Delete Post
   handleDelete = async (post) => {

    const originalPosts = this.state.posts; 
      
     const posts = this.state.posts.filter(p=> p.id !== post.id); 

     this.setState({ posts }); 

     try{
      await axios.delete(config.apiEndpoint + '/' + post.id);
      toast.success("post deleted"); 
     }catch(ex){
       if(ex.response && ex.response.status === 404){
        alert('The post is already deleted!');
       }
       this.setState({ posts: originalPosts})
     }
   }

  render() { 
    const { posts } = this.state; 
    return ( 
      <main className="container">
        <ToastContainer />
        <MoviesList 
        posts={posts} 
        addPost = {this.handleAdd}
        updatePost = {this.handleUpdate}
        deletePost = {this.handleDelete} />
      </main>
     );
  }
}
 
export default App;