import Post from "../post/Post";
import "./posts.css"
//here taking posts value propped from home 
//now print all posts here and again prop it to Post 
export default function Posts({posts}) {
  return (
   
        <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
       
    
  );
}
