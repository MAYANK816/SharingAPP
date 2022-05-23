import React from 'react'
import Lottie from 'react-lottie-player';
import lottieJson from '../animation/radaranimation.json'
import "./Home.css"
const Home = () => {
    return (
        <div className="Home_animation">
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 250, height: 250 }}
            />



        </div>
    )
}

export default Home