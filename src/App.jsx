import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Quiz from './components/Quiz'
import Score from './components/Score'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/score' element={<Score />} />
          <Route path='/quiz' element={<Quiz />} />

        </Routes>
      </div>
    </Router>



  )
}

export default App