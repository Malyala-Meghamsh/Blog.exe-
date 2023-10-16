import React, { useEffect, useState, useContext} from "react";
import "../comment/comment.css";
import axios from "axios";
import { Context } from "../../context/Context";
const img_icon = "https://res.cloudinary.com/dhjrxapj5/image/upload/v1697283889/vwcow1fzjknxgrn3vzyn.png"
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  

function Comment({parentId, comments, setComments}){
    const [immediateCmnts, setImCmnts] = useState([]);
    const [visible, setVisible] = useState(parentId === 0);
    const [rep_visible, set_rep_visible] = useState(parentId === 0); // parentId === 0
    const [inputIndex, setInputIndex] = useState(-1);
    const [content, setContent] = useState();
    const [r_content, r_setContent] = useState();
    
    const { user } = useContext(Context);
    async function submitComment(e){
        if (!content.trim()) {
            return;
        }
        console.log(e);
        const comment = {
            postId:comments[0].postId,
            content:content,
            username: user.username,
        }
        if(e.target.value === "root"){
            comment.parentId = 0; 
            comment.content = r_content;
        }
        else{
            comment.parentId = immediateCmnts[inputIndex]._id;
        }
        console.log(comment);
        const res = await axios.post("/comments", comment);
        const x = await axios.get("/comments/", {params: {p_id : comments[0].postId, postId: comments[0].postId}})
        setComments(x.data);
        setContent("");
        r_setContent("");
        setInputIndex(-1);
        setImCmnts(comments.filter(el=>{ return el.parentId == parentId}));
    }
    useEffect(()=>{
        setImCmnts(comments.filter(el=>{ return el.parentId == parentId}));
    },[comments]);
    return <div>
            {parentId === 0 && <div className="hehe"> <input placeholder="Write a comment" className="post-comments" type="text" value={r_content} onChange={(e)=>{r_setContent(e.target.value)}} /> <button onClick={submitComment} value="root">Comment</button> </div>}
            {immediateCmnts.length != 0 && (visible || <div className="hi" onClick={()=>{setVisible(true)}}>View Comments</div>)}
            <ul className="comments">

            {visible && immediateCmnts.map((el, index)=>{
                return <>
                    <li className="clearfix">
                        <img src={img_icon} width={"15px"} height={"15px"} class="avatar" alt="ICON"/>
                        <div class="post-comments">
				            <p class="meta" style={{"margin-top" :"5px"}} > {/*monthNames[el.createdAt.getMonth()]} - {el.createdAt.getYear()*/} <a href="#">{el.username}</a> : <i class="pull-right"><a 
                            onClick={()=>{setInputIndex(index)}}
                              className="a"><small>Reply</small></a></i></p>
				            <p style={{"margin-bottom" :"10px", "margin-top": "10px"}}>
				                {el.content}
				            </p>
				        </div>
                        {index === inputIndex && <div className="hehe"><input placeholder="Write a comment" type="text" value={content} className="post-comments" onChange={(e)=>{setContent(e.target.value)}}/> <button onClick={submitComment}>Comment</button></div>}
                    </li>
                    {/* <div>{el.content}</div> */}
                    <Comment parentId={el._id} comments={comments} setComments={setComments}/> 
                </>
            })}
            </ul>
    </div>
}
export default Comment;