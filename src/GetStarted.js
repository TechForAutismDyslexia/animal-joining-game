// GetStarted.jsx
import React, { useState } from 'react';
import InstructionsPopup from './InstructionsPopup'; // Assuming you have an InstructionsPopup component

const GetStarted = ({ onStart }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleGetStarted = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    onStart(); // Callback to handle starting the game
  };

  return (
    <div className="get-started-container">
      <h1 className="heading">Join the Animal</h1>
      <button className="button-74" onClick={handleGetStarted}>
        Get Started
      </button>
      {showPopup && <InstructionsPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default GetStarted;
