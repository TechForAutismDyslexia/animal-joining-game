

import React, { useState, useEffect } from 'react';
import '../App.css';

const InstructionsPopup = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const instructionsText = `
    Rotate your device horizontally to play the game.
    Match the animal's halves correctly.
    Your total time will be shown after completing all levels.
  `;

  useEffect(() => {
    if (isPlaying) {
      const utterance = new SpeechSynthesisUtterance(instructionsText);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [isPlaying, instructionsText]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="heading" style={{fontSize: '40px'}}>Instructions</h2>
        <ul className="instructions-list">
          <li>Rotate your device </li>
          <li>Match the animal's halves correctly.</li>
        </ul>
        <div className="button-row">
          <button className="button-74 small-button" onClick={onClose}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;
