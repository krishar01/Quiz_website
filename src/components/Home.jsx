import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';


const Home = () => {
  const navigate = useNavigate();

  const go_to_quiz = () => {
    navigate('/quiz/form');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🧠 Welcome to QuizMaster!</h1>
        <p>Test your knowledge across categories like Science, History, Geography & more.</p>
        <button className="start-btn" onClick={go_to_quiz}>Start Quiz</button>
      </div>
      <div className="home-image">
        <video autoPlay muted loop playsInline style={{ pointerEvents: 'none' }}>
         <source src="/media/eyes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Home;
