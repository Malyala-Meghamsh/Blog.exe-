import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import Comments from "../comment/comment";

export default function SinglePost() {
    const location = useLocation();//it provides location of postid 
    //console.log(location);
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [likes, setLikes] = useState([]);

    const [updateMode, setUpdateMode] = useState(false);
	const [subsModal, setSubModal] = useState(false);
    const [rec_comment, setRecComments] = useState([]);
	function closeSubscribe(){
        console.log("IDa ochindi");
		setSubModal(false);
	}
	//whenever a the changes useeffect triggers 
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            // console.log(res);
            const x = await axios.get("/comments/", {params: {p_id :0, postId: res.data._id}});
            console.log("KJBJHVUHV", x.data);
            setRecComments(x.data);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setLikes(res.data.likes);
        };
        getPost();
    }, [path]);
    useEffect(()=>{
        console.log(rec_comment);
    },[rec_comment]);
    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false)
        } catch (err) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                )}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b> {post.username}</b>
                        </Link>
                    </span>

                    <div className="btnn" role="button" onClick={()=>{setSubModal(true)}}>
                            Subscribe
                    </div>        
                    
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>

                <div class='large-font text-center top-20'>
                    <ion-icon name="heart">
                        <div class='red-bg'></div>
                    </ion-icon>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : <></>}
                    <>
						{subsModal && <SubscribeModal closeWindow={closeSubscribe} ownerName={post.username}/>}
                        <p className="singlePostDesc">{desc}</p>
                    </>
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
            <div className="blog-comment">
                <Comments parentId={0} comments={rec_comment} setComments={setRecComments}/>
            </div>
        </div>
    );
}