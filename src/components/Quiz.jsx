
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Quiz.css';


const Quiz = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [playerName, setPlayerName] = useState(localStorage.getItem('PlayerName') || '');

  const record = useRef(null);
  const navigate = useNavigate();

    {console.log('Player Name:', playerName)}

  useEffect(() => {
    if ( data.length>0&&!submitted) {

      record.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(record.current);
  }, [data, submitted, currentQ]);




  useEffect(() => {
    setSeconds(0);
  }, [currentQ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://the-trivia-api.com/api/questions?categories=${category}&difficulty=${difficulty}&limit=10`
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const result = await res.json();
        setData(result);
        setCurrentQ(0);
        setSelected(null);
        setSubmitted(false);
      } catch (err) {
        setError(err.message);
        setData([]);
      }
    };

    if (category && difficulty) fetchData();
  }, [category,difficulty]);


  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const item = data[currentQ] ?? {};
  const allAnswers = useMemo(() => {
    if (!item.correctAnswer || !item.incorrectAnswers) return [];
    return shuffleArray([item.correctAnswer, ...item.incorrectAnswers]);
  }, [item]);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

   
  if (!(category && difficulty)) {
    return (
      <div className='cover_box'>
        <div className="player-name-box">
      👤 {playerName || 'Player'}
    </div>
        <div className='qus_cover'>
          
          <h2>Select a Category</h2>
          <select onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="geography">Geography</option>
            <option value="music">Music</option>
          </select>
          {

            <div>
              <h2>Select Difficulty</h2>
              <select onChange={(e) => setDifficulty(e.target.value)}>
                <option value={''}>-- Select Difficlty --</option>
                <option value={'easy'}>Easy</option>
                <option value={'medium'}>Medium</option>
                <option value={'hard'}>Hard</option>
              </select>
            </div>

          }
          <p style={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '20px' }}>
            Correct Answer points: <span style={{ color: 'green' }}>+4</span></p>
          <p style={{ paddingTop: '10px', fontWeight: 'bold', fontSize: '19px' }}>
            Incorrect Answer pointes: <span style={{ color: 'red' }}>-1</span></p>
        </div>

      </div>

    );

  }


  if (data.length === 0) return <p style={{color:'white'}}>Loading...</p>;
  
  return (

    <>
      

      
      <div className='qus_slide'>
      <div className="player-name-box">
      👤 {playerName || 'Player'}
    </div>
      <h2>Question {currentQ + 1} of {data.length}</h2>
      <p>{item.question}</p>

      <div>⏱️ Time: {seconds} s</div>

      {allAnswers.map((ans, i) => (
        <button
          key={i}
          onClick={() => setSelected(ans)}
          disabled={submitted}
          style={{
            backgroundColor: submitted
              ? ans === item.correctAnswer
                ? 'lightgreen'
                : ans === selected
                  ? 'salmon'
                  : ''
              : selected === ans
                ? '#ddd'
                : '',
            display: 'block',
            margin: '6px 0',
          }}
        >
          {ans}
        </button>
      ))}

      {!submitted && (
        <button
          style={{ marginTop: '10px', backgroundColor: 'lightblue', scale: '1.05' }}
          onClick={() => {
            if (selected !== null) {
              setSubmitted(true);
              clearInterval(record.current);
            }

          }}
        >
          Submit
        </button>
      )}

      {submitted && currentQ < data.length - 1 && (
        <button
          style={{ marginTop: '10px' }}
          onClick={() => {
            clearInterval(record.current);
            setSeconds(0);
            record.current = setInterval(() => {

              setSeconds((prev) => prev + 1);



            }, 1000);
            setCurrentQ((prev) => prev + 1);
            setSelected(null);
            setSubmitted(false);

          }}
        >
          Next
        </button>
      )}

      {submitted && currentQ === data.length - 1 && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>🎉 Quiz Completed!</p>
      )}
      {submitted && currentQ === data.length - 1 && (<button className='new-game' onClick={() => {
        setCategory('');
        setDifficulty('');
        setData([]);
        setCurrentQ(0);
        setSelected(null);
        setSubmitted(false);
        setSeconds(0);
      }}>New Quiz</button>)}
      {submitted && currentQ === data.length - 1 && (<button className='home' onClick={() => navigate('/')}>Home</button>)}

    </div>
    </>
    


  );
};

export default Quiz;

