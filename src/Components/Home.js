import React, { useState, useEffect } from 'react'
import "./Home.css"
const Home = () => {
    const [roomId, setroomId] = useState("000-000-000");
    const [showId, setshowId] = useState(false);
    const generateRoomId = () => {
        let Id = Math.trunc(Math.random() * 999) + "-" + Math.trunc(Math.random() * 999) + "-" + Math.trunc(Math.random() * 999);
        setroomId(Id);
    }
    useEffect(() => {
        generateRoomId();
    }, [])
    const createRoom = () => {
        setshowId(!showId);
    }
    return (
        <>
            <div>
                <h2>Share Your Files Securely</h2>
                {!showId && <button onClick={createRoom} id="room_gen">Create Secure Room</button>}
                {showId && <input value={roomId} disabled id="room_id_holder"></input>}
                <br />
                {
                    showId && <div id="file_holder">
                        <div id="file_logo"></div>
                        <input type="file"></input>
                    </div>

                }
                {showId && <button className='send_btn'>Send File</button>}


            </div>
        </>
    )
}

export default Home;