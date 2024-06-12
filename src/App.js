import React, { useState } from 'react';
import Level1 from './Level1';
import Level2 from './Level2';
import './App.css';
// Import additional levels as needed
import Level3 from './Level3';
import Level4 from './Level4';

const levels = [Level1, Level2, Level3,Level4/* ... */];

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(0); // Use index (0-based)

  const nextLevel = () => {
    setCurrentLevel((prevLevel) => Math.min(prevLevel + 1, levels.length - 1));
  };

  const prevLevel = () => {
    setCurrentLevel((prevLevel) => Math.max(prevLevel - 1, 0));
  };

  const renderLevel = () => {
    const LevelComponent = levels[currentLevel];
    return <LevelComponent onNext={nextLevel} onPrev={prevLevel} />;
  };

  return (
    <div>
      <h1 class="heading" style={{ textAlign: 'center' }}>Let's Play</h1>
      {renderLevel()}
      <div style={{ textAlign: 'center', marginTop: '0px' }}>
        <button class="button-74" onClick={prevLevel} disabled={currentLevel === 0}>
          Previous
        </button>&nbsp;&nbsp;&nbsp;
        <button  class="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
