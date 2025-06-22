import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Quiz.css';

const PlayerForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem('PlayerName', name.trim());
    navigate('/quiz');
  };

  return (
    <div style={formContainer}>
      <form onSubmit={handleStart} style={formBox}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Enter Your Name to Start</h2>
        <input
          type="text"
          value={name}
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <br />
        <button
          type="submit"
          disabled={!name.trim()}
          style={{
            ...buttonStyle,
            backgroundColor: name.trim() ? '#4CAF50' : '#ccc',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            
          }}
        >
          🚀 Start Quiz
        </button>
      </form>
    </div>
  );
};


const formContainer = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
};

const formBox = {
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  textAlign: 'center',
  width: '90%',
  maxWidth: '400px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  marginBottom: '1rem',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  transition: '0.3s',
};





export default PlayerForm;
