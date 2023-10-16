import React from 'react';
import'./post.css'
import {Link} from "react-router-dom"
function Post({post}) {
  const PF="http://localhost:5005/images/"
  // console.log(PF+post.photo)
  return (
    <div className="post">
      {post.photo &&(
        <img className="postImg" src={PF+post.photo} alt="" />)}
        <div className="postInfo">
            <div className="postCats">
               {post.categories.map((c)=>[
                  <span className='postCat'>{c.name}</span>
               ])}
            </div>
            {/* <div class='large-font text-center top-20'>
              <ion-icon name="heart">
                <div class='red-bg'></div>
              </ion-icon>
            </div> */}
            <Link to={`/post/${post._id}`}  className="link">
            <span className="postTitle">{post.title}</span></Link>
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {/* <div class='large-font text-center top-20'>
          <ion-icon name="heart">
            <div class='red-bg'></div>
          </ion-icon>
        </div> */}
        <p className="postDesc">
            {post.desc}
        </p>
    </div>
  );
}
//creating a link to single post in line no 17
export default Post;