import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleStart} style={{ textAlign: 'center', marginTop: '100px' }}>
      <input
        type="text"
        value={name}
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <br /><br />
      <button
        type="submit"
        disabled={!name.trim()}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Start Quiz
      </button>
    </form>
  );
};

export default PlayerForm;
