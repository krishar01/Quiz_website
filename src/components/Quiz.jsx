import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=10`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const result = await res.json();
        setData(result);
        setCurrentQ(0); // reset question index
        setSelected(null);
        setSubmitted(false);
      } catch (err) {
        setError(err.message);
        setData([]);
      }
    };

    if (category) fetchData();
  }, [category]);

  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  if (!category) {
    return (
      <div>
        <h2>Select a Category</h2>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="geography">Geography</option>
          <option value="music">Music</option>
        </select>
      </div>
    );
  }

  if (data.length === 0) return <p>Loading...</p>;

  const item = data[currentQ];
  const answers = shuffleArray([...item.incorrectAnswers, item.correctAnswer]);

  return (
    <div>
      <h2>Question {currentQ + 1} of {data.length}</h2>
      <p>{item.question}</p>

      {answers.map((ans, i) => (
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
          style={{ marginTop: '10px' }}
          onClick={() => {
            if (selected !== null) setSubmitted(true);
          }}
        >
          Submit
        </button>
      )}

      {submitted && (
        <button
          style={{ marginTop: '10px' }}
          onClick={() => {
            setCurrentQ((prev) => prev + 1);
            setSelected(null);
            setSubmitted(false);
          }}
        >
          Next
        </button>
      )}
      {<button onClick={()=>{
        setCurrentQ((curent)=>curent-1);
      }} disabled={currentQ==0}>
        previous
      </button> }
    </div>
  );
};

export default Quiz;
