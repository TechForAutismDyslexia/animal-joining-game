
// import React, { useState, useEffect } from 'react';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import './App.css';
// // Import additional levels as needed
// import Level3 from './Level3';
// import Level4 from './Level4';

// const levels = [Level1, Level2, Level3, Level4/* ... */];

// const App = () => {
//   const [currentLevel, setCurrentLevel] = useState(0); // Use index (0-based)
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimer(prevTimer => prevTimer + 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [currentLevel]);

//   const nextLevel = () => {
//     setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length - 1));
//     setTimer(0); // Reset timer when moving to the next level
//   };

//   const prevLevel = () => {
//     setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
//     setTimer(0); // Reset timer when moving to the previous level
//   };

//   const renderLevel = () => {
//     const LevelComponent = levels[currentLevel];
//     return <LevelComponent onNext={nextLevel} onPrev={prevLevel} />;
//   };

//   return (
//     <div>
//       {/* <h4>lets play</h4> */}
//       <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '30px' }}>
//         Timer: {formatTime(timer)}
//       </div>
//       <div className="button-container">
//         <button className="button-74" onClick={prevLevel} disabled={currentLevel === 0}>
//           Previous
//         </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1}>
//           Next
//         </button>
//       </div>
//       {renderLevel()}
//     </div>
//   );
// };

// // Function to format time as MM:SS
// const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
// };

// export default App;
import React, { useState, useEffect, useRef } from 'react';
import Level1 from './Level1';
import Level2 from './Level2';
import './App.css';
// Import additional levels as needed
import Level3 from './Level3';
import Level4 from './Level4';

const levels = [Level1, Level2, Level3, Level4/* ... */];

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(0); // Use index (0-based)
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Audio play state
  const audioRef = useRef(null); // Reference to audio element

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentLevel]);

  const nextLevel = () => {
    setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length - 1));
    setTimer(0); // Reset timer when moving to the next level
  };

  const prevLevel = () => {
    setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
    setTimer(0); // Reset timer when moving to the previous level
  };

  const renderLevel = () => {
    const LevelComponent = levels[currentLevel];
    return <LevelComponent onNext={nextLevel} onPrev={prevLevel} />;
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      {/* Audio Player */}
      
      <div className="audio-player">
        <audio ref={audioRef} src="images/inst.mp3" />
        <button className="button-74" onClick={toggleAudio} >
          {isPlaying ? 'Pause' : 'Instruction'}
        </button>
      </div>

      {/* Timer */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '30px' }}>
        Timer: {formatTime(timer)}
      </div>

      {/* Navigation Buttons */}
      <div className="button-container">
        <button className="button-74" onClick={prevLevel} disabled={currentLevel === 0}>
          Previous
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1}>
          Next
        </button>
      </div>

      {/* Level Content */}
      {renderLevel()}
    </div>
  );
};

// Function to format time as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default App;
