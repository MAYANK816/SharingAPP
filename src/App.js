import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About'
const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </>
    </Router>
  )
}

export default App