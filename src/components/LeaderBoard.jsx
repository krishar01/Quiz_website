import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
    const [records, setRecord] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('quizScores')) || [];
        const sorted = stored.sort((a, b) => b.score - a.score);
        setRecord(sorted);


    }, [])

    return (
        <>
            <div className="cover_box" style={{ width:'90%', overflowX: 'auto' }}>
                <div className="qus_cover">
                    <h2 style={{ color: '#333' }}>🏆 Leaderboard</h2>
                    {records.length === 0 ? (
                        <p>No records yet. Play a quiz to appear here!</p>
                    ) : (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>#</th>
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Score</th>
                                    <th style={thStyle}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((rec, index) => (
                                    <tr key={index}>
                                        <td style={tdStyle}>{index + 1}</td>
                                        <td style={tdStyle}>{rec.name}</td>
                                        <td style={tdStyle}>{rec.score}</td>
                                        <td style={tdStyle}>{rec.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <br />
                    <button className="home" onClick={() => navigate('/')}> Back to Home</button>
                </div>
            </div>
        </>
    )
}
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle = {
  padding: '0px',
  textAlign: 'left',
  backgroundColor: '#f9f9f9',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};

export default LeaderBoard