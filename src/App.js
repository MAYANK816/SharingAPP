import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Receiver from './Components/Receiver';
const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/receiver" element={<Receiver />} />
        </Routes>
      </>
    </Router>
  )
}

export default App