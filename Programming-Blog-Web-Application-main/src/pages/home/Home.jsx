import Header from "../../components/header/Header"
import Posts from "../../components/posts/posts";
import Sidebar from "../../components/sidebar/Sidebar"
import React from 'react';
import{useState,useEffect} from 'react';
import "./Home.css"
import axios from "axios";
import { useLocation } from "react-router";

function  Home() {
  const [posts,setPosts]=useState([]);
  const {search}= useLocation();//for a particular user we can fetch for it all blogs of him
  // const skipPosts = 0;
  // const initialPosts = 10;
  // const params = {
  //   skipPosts
  // }
  const [params, setParams] = useState(
    {
      skipPosts : 0,
      presPosts : 2
    }
  )
  var [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  function handleScroll() {
    const isBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight;
    if (isBottom) {
      setIsAtBottom(isBottom);
      // alert("Bottom");
    }
  }
  // 0 10
  // 10 10
  // 20 20
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    var res = -1;
    var nextAsk = true;
    const fetchPosts=async()=>{
      try {
        if(nextAsk) 
        {
          if(!search)
          {

            // console.log(res);
            setLoading(true);
            res=await axios.get('/posts'+search, {params})
            // console.log(res.data);
            setPosts([...posts, ...res.data]);
            if(res.data.length)setIsAtBottom(false);
          // console.log(params);
          setLoading(false);
          if(res.data.length == 0)
          {
            // console.log("kiuygeuke");
            // console.log(loading);
            nextAsk = false;
          }
          // if(res)323355
          // {
            setParams({
              skipPosts : posts.length+ res.data.length,
              presPosts : 2
            });
          // }        
          }
          else
          {
            const res=await axios.get('/posts'+search)
            setPosts(res.data);
          }
        }
        else
        {
          res = [];
        }
      } catch (err) {
         if (err.response) {
            console.log(err.response.status)
            console.log(err.response.data)
         }
         
      }
      
    }
    fetchPosts();
  },[search, isAtBottom])
  // useEffect(()=>{

  // },[]);
  return (
    //here iam propping posts , now move to posts 
    <>
        
        <Header/>
        <div className="home">
            <div>
              
            <Posts posts={posts}/>
            {loading && 
              <div style={{"text-align":"center"}}>Loading...</div>
            }
            </div>
            <Sidebar/>
        </div>
    </>
  );
}

export default Home;