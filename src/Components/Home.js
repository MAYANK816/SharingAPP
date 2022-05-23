import React from 'react'
import Lottie from 'react-lottie-player';
import lottieJson from '../animation/radaranimation.json'
import "./Home.css"
import {
    useNavigate
}
    from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="Home_animation">
                <div className='Home_content'>
                    <h2>SHARE YOUR FILES SECUERLY</h2>
                    <div className='btn_grp'>
                        <button onClick={() => navigate('sender')}>Send</button>
                        <button onClick={() => navigate('receiver')}>Receive</button>
                    </div>
                    <Lottie
                        loop
                        animationData={lottieJson}
                        play
                        style={{ width: 250, height: 250, marginTop: 20 }}
                    />
                </div>
                <img src='/images/homeIcon.png' alt="banner_img"></img>
            </div>

        </>

    )
}

export default Home