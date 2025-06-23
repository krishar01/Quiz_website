import React from 'react';
import '../style/Quiz.css'; 
import '../style/About.css'

const About = () => {
  return (
    <div className="about-section">
      <h2 style={{textAlign:'center'}}>About This Quiz App 🤓</h2>
      <p className="about-text">
        This is not just any quiz app. It’s the battleground where brains meet memes.
        Test your knowledge, guess with confidence, and laugh at your mistakes (we’ve all been there). 🎯
      </p>

      <div className="meme-gallery">
        <div className="meme-card">
          <img src="/media/meme1.jpg" alt="Genius moment" />
          <p>When they told you to add memes in project</p>
        </div>

        <div className="meme-card">
          <img src="/media/meme3.jpg" alt="Guess correct" />
          <p>When you guess and it’s actually right 😎</p>
        </div>

        <div className="meme-card">
          <img src="/media/meme2.jpg" alt="Confused options" />
          <p>When all 4 options sound correct 🤯</p>
        </div>
      </div>
    </div>
  );
};

export default About;
