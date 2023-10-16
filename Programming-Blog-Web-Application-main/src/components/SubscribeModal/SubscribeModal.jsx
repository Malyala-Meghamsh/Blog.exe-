
import React, { useState, useEffect } from "react";
import "../SubscribeModal/SubscribeModal.css";
import ReactDOM from "react-dom";
import axios from 'axios';

function Subscribe({closeWindow, ownerName}) {
    // useState
    const [emailid, setEmailId] = useState("");
    async function handleSubmit() {
        const sub_email_username = {
            email : emailid,
            username : ownerName
        }
        // console.log(sub_email_username);
        try {
            console.log("REs");
            const res = await axios.post("/subscribe", sub_email_username);
            console.log(res);
            closeWindow();
            // log
        } catch (error) {
            console.log(error);
        }
    }
    return ReactDOM.createPortal(<>
        <div className="modal-wrapper" onClick={closeWindow}></div>
        <div className="modalcontainerr">

        <section class="container">
            <section class="one">
                <h2 class="heading">
                    Please subscribe to get updates
                </h2>
                <p> Enter your email to get latest updates from this User</p>
            <div>
                <input type='text' onChange={(e)=>{setEmailId(e.target.value)}} value={emailid} placeholder="enter your email"/><br/>
                <button class="btn" onClick={handleSubmit}>
                    Subscribe
                </button>
            </div>
            </section>
            <section class="two">
                <h3>
                    Thank You for subscribing !
                </h3>
                <div class="close"> 
                </div>
            </section>
        </section>
        </div>
    </>, document.getElementById("myModal"));
}

export default Subscribe;