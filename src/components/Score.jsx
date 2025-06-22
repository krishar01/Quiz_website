import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Quiz.css'; 
import '../style/Score.css';

const Score = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('latestQuizResult'));
    if (storedData) {
      setSummary(storedData);
    } else {
      navigate('/'); 
    }
  }, [navigate]);

  if (!summary) return null;

  const { name, score, date } = summary;

  const getMessage = () => {
    if (score >= 30) return "🔥 You're a Quiz Master!";
    if (score >= 15) return "🎯 Great job! Keep improving.";
    return "💡 Keep practicing. You’ve got this!";
  };

  return (
    <div className="cover_box">
      <div className="qus_cover">
        <h2 style={{ color: '#333' }}>Quiz Summary</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Score:</strong> {score}</p>
       
        <p><strong>Date:</strong> {date}</p>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
          {getMessage()}
        </p>
        <br />
        <button className="new-game" onClick={() => navigate('/quiz')}>New Quiz</button>
        <button className="home" onClick={() => navigate('/')}>Home</button>
        <button className='home' onClick={()=> navigate('/leaderboard')}>Leaderboard</button>
      </div>
    </div>
  );
};

export default Score;
