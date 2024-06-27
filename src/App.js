
// import React, { useState, useEffect, useRef } from 'react';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import Level3 from './Level3';
// import Level4 from './Level4';
// import Level5 from './Level5';
// import Level6 from './Level6';
// import './App.css';
// import InstructionsPopup from './InstructionsPopup'; // Import InstructionsPopup component

// const levels = [Level1, Level2, Level3, Level4, Level5, Level6];
// const totalLevels = levels.length;

// const App = () => {
//   const [currentLevel, setCurrentLevel] = useState(-1); // -1 indicates the start page
//   const [startTime, setStartTime] = useState(0);
//   const [endTime, setEndTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showInstructions, setShowInstructions] = useState(false); // State to control showing InstructionsPopup
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (startTime !== 0 && currentLevel >= totalLevels) {
//       setEndTime(Date.now()); // Record end time when all levels are completed
//     }
//   }, [currentLevel, startTime, totalLevels]);

//   const nextLevel = () => {
//     setCurrentLevel(prevLevel => Math.min(prevLevel + 1, totalLevels));
//   };

//   const prevLevel = () => {
//     setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
//   };

//   const replayGame = () => {
//     setCurrentLevel(-1);
//     setStartTime(0);
//     setEndTime(0);
//     setShowInstructions(false);
//   };

//   const renderLevel = () => {
//     if (currentLevel === -1) {
//       return (
//         <div className="start-page">
//           <h3 className='heading'>Animal Matching Game</h3>
//           <button className="button-74" onClick={() => setShowInstructions(true)}>
//             Start playing
//           </button>
//           {showInstructions && (
//             <InstructionsPopup onClose={() => {
//               setCurrentLevel(0);
//               setStartTime(Date.now()); // Start the timer
//               setShowInstructions(false); // Close InstructionsPopup
//             }} />
//           )}
//         </div>
//       );
//     } else if (currentLevel < totalLevels) {
//       const LevelComponent = levels[currentLevel];
//       return <LevelComponent onNext={nextLevel} onPrev={prevLevel} onLevelComplete={handleLevelComplete} />;
//     } else {
//       const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
//       return (
//         <div className="end-page">
//           <h3 className='heading' style={{ fontSize: '50px' }}>Congratulations! You completed the game.</h3>
//           <img src="images/last.gif" style={{ width: '200px', height: 'auto' }} alt="Congratulations GIF" />
//           <p style={{ fontSize: '40px' }}>Total Time: {formatTime(totalTimeInSeconds)}</p>
//           <button className="button-74" onClick={replayGame}>
//             Replay
//           </button>
//         </div>
//       );
//     }
//   };

//   const handleLevelComplete = () => {
//     // No need to check currentLevel === totalLevels - 1, since we increment past the last level
//   };

//   const toggleAudio = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="app-container">
//       <div className="audio-player">
//         <audio ref={audioRef} src="images/inst.mp3" />
//         <img
//           src="images/audio.png"
//           alt="Play"
//           className="play-icon"
//           onClick={toggleAudio}
//           style={{ width: '50px', height: '50px', cursor: 'pointer' }}
//         />
//       </div>

//       {currentLevel >= 0 && currentLevel < totalLevels && (
//         <div className="button-container">
//           <button className="button-74" onClick={prevLevel} disabled={currentLevel <= 0}>
//             Previous
//           </button>
//           <button className="button-74" onClick={nextLevel} disabled={currentLevel === totalLevels}>
//             Next
//           </button>
//         </div>
//       )}

//       <div className="level-container">
//         {renderLevel()}
//       </div>
//     </div>
//   );
// };

// const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
// };

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import Level5 from './Level5';
import Level6 from './Level6';
import Level7 from './Level7';
import Level8 from './Level8';
import Level9 from './Level9';
import Level10 from './Level10';
import Level11 from './Level11';
import Level12 from './Level12';
import './App.css';
import InstructionsPopup from './InstructionsPopup'; // Import InstructionsPopup component

const sessionLevels = {
  session1: [Level1, Level2,Level3,Level4,Level5,Level6],
  session2: [Level7, Level8,Level9,Level10,Level11,Level12],
  session3: [Level5, Level6],
};

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(-1); // -1 indicates the start page
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [levels, setLevels] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false); // State to control showing InstructionsPopup
  const audioRef = useRef(null);

  useEffect(() => {
    if (startTime !== 0 && currentLevel >= levels.length) {
      setEndTime(Date.now()); // Record end time when all levels are completed
    }
  }, [currentLevel, startTime, levels.length]);

  const nextLevel = () => {
    setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length));
  };

  const prevLevel = () => {
    setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
  };

  const replayGame = () => {
    setCurrentLevel(-1);
    setStartTime(0);
    setEndTime(0);
    setSelectedSession(null);
    setShowInstructions(false);
  };

  const renderLevel = () => {
    if (currentLevel === -1) {
      return (
        <div className="start-page">
          <h3 className='heading'>Animal Matching Game</h3>
          <button className="button-74" onClick={() => handleSessionSelect('session1')}>
            Session 1
          </button>
          <button className="button-74" onClick={() => handleSessionSelect('session2')}>
            Session 2
          </button>
          <button className="button-74" onClick={() => handleSessionSelect('session3')}>
            Session 3
          </button>
        </div>
      );
    } else if (currentLevel < levels.length) {
      const LevelComponent = levels[currentLevel];
      return <LevelComponent onNext={nextLevel} onPrev={prevLevel} onLevelComplete={handleLevelComplete} />;
    } else {
      const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
      return (
        <div className="end-page">
          <h3 className='heading' style={{ fontSize: '50px' }}>Congratulations! You completed the game.</h3>
          <img src="images/last.gif" style={{ width: '200px', height: 'auto' }} alt="Congratulations GIF" />
          <p style={{ fontSize: '40px' }}>Total Time: {formatTime(totalTimeInSeconds)}</p>
          <button className="button-74" onClick={replayGame}>
            Replay
          </button>
        </div>
      );
    }
  };

  const handleLevelComplete = () => {
    // No need to check currentLevel === totalLevels - 1, since we increment past the last level
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setLevels(sessionLevels[selectedSession]);
    setCurrentLevel(0);
    setStartTime(Date.now()); // Start the timer
    setShowInstructions(false);
  };

  return (
    <div className="app-container">
      <div className="audio-player">
        <audio ref={audioRef} src="images/inst.mp3" />
        <img
          src="images/audio.png"
          alt="Play"
          className="play-icon"
          onClick={toggleAudio}
          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
        />
      </div>

      {currentLevel >= 0 && currentLevel < levels.length && (
        <div className="button-container">
          <button className="button-74" onClick={prevLevel} disabled={currentLevel <= 0}>
            Previous
          </button>
          <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length}>
            Next
          </button>
        </div>
      )}

      <div className="level-container">
        {renderLevel()}
      </div>

      {showInstructions && (
        <InstructionsPopup onClose={handleCloseInstructions} />
      )}
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default App;
