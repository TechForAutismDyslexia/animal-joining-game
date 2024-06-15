
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

// import React, { useState, useEffect, useRef } from 'react';
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
//   const [isPlaying, setIsPlaying] = useState(false); // Audio play state
//   const audioRef = useRef(null); // Reference to audio element

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimer(prevTimer => prevTimer + 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [currentLevel]);

//   const nextLevel = () => {
//     setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length - 1));
//     // setTimer(0); // Reset timer when moving to the next level
//   };

//   const prevLevel = () => {
//     setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
//     // setTimer(0); // Reset timer when moving to the previous level
//   };

//   const renderLevel = () => {
//     const LevelComponent = levels[currentLevel];
//     return <LevelComponent onNext={nextLevel} onPrev={prevLevel} />;
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
//       {/* Audio Player */}
      
//       <div className="audio-player">
//         <audio ref={audioRef} src="images/inst.mp3" />
//         <button className="button-74" onClick={toggleAudio} >
//           {isPlaying ? 'Pause' : 'Instruction'}
//         </button>
//       </div>

//       {/* Timer */}
//       <div style={{ position: 'absolute', top: '80px', right: '10px', fontSize: '30px' }}>
//         Timer: {formatTime(timer)}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="button-container">
//         <button className="button-74" onClick={prevLevel} disabled={currentLevel === 0}>
//           Previous
//         </button>
//         <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1}>
//           Next
//         </button>
//       </div>

//       {/* Level Content */}
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

// // export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import Level3 from './Level3';
// import Level4 from './Level4';
// import './App.css';

// const levels = [Level1, Level2, Level3, Level4];

// const App = () => {
//   const [currentLevel, setCurrentLevel] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimer(prevTimer => prevTimer + 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [currentLevel]);

//   const nextLevel = () => {
//     setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length - 1));
//   };

//   const prevLevel = () => {
//     setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
//   };

//   const renderLevel = () => {
//     const LevelComponent = levels[currentLevel];
//     return <LevelComponent onNext={nextLevel} onPrev={prevLevel} />;
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
//         <button className="button-74" onClick={toggleAudio}>
//           {isPlaying ? 'Pause' : 'Instruction'}
//         </button>
//       </div>

//       <div className="timer">
//         Timer: {formatTime(timer)}
//       </div>

//       <div className="button-container">
//         <button className="button-74" onClick={prevLevel} disabled={currentLevel === 0}>
//           Previous
//         </button>
//         <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1}>
//           Next
//         </button>
//       </div>

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

// import React, { useState, useEffect, useRef } from 'react';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import Level3 from './Level3';
// import Level4 from './Level4';
// import Level5 from './Level5';
// import Level6 from './Level6';
// import Level8 from './Level8';
// import './App.css';

// const levels = [Level1, Level2, Level3, Level4, Level5,Level6];

// const App = () => {
//   const [currentLevel, setCurrentLevel] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimer(prevTimer => prevTimer + 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [currentLevel]);

//   const nextLevel = () => {
//     setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length - 1));
//   };

//   const prevLevel = () => {
//     setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
//   };

//   const renderLevel = () => {
//     const LevelComponent = levels[currentLevel];
//     return <LevelComponent onNext={nextLevel} onPrev={prevLevel} />;
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

//       <div className="timer">
//         Timer: {formatTime(timer)}
//       </div>

//       <div className="button-container">
//         <button className="button-74" onClick={prevLevel} disabled={currentLevel === 0}>
//           Previous
//         </button>
//         <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1}>
//           Next
//         </button>
//       </div>

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

// // // export default App;
// import React, { useState, useEffect, useRef } from 'react';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import Level3 from './Level3';
// import Level4 from './Level4';
// import Level5 from './Level5';
// import Level6 from './Level6';
// import './App.css';

// const levels = [Level1, Level2, Level3, Level4, Level5, Level6];
// const totalLevels = levels.length;

// const App = () => {
//   const [currentLevel, setCurrentLevel] = useState(-1); // -1 indicates the start page
//   const [startTime, setStartTime] = useState(0);
//   const [endTime, setEndTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
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

//   const renderLevel = () => {
//     if (currentLevel === -1) {
//       return (
        


//         <div className="start-page">
//           <h3 className='heading'>Animal Matching Game</h3>
//           <p style={{fontSize:30}}>How to Play:<br></br>
//             Join the half of the animal to it's other half

//           </p>
//           <p style={{fontSize:30}}>please rotate your device</p>
//           <button className="button-74" onClick={() => {
//             setCurrentLevel(0);
//             setStartTime(Date.now()); // Start the timer
//           }}>
//             Start playing
//           </button>
//         </div>
//       );
//     } else if (currentLevel < totalLevels) {
//       const LevelComponent = levels[currentLevel];
//       return <LevelComponent onNext={nextLevel} onPrev={prevLevel} onLevelComplete={handleLevelComplete} />;
//     } else {
//       const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
//       return (
//         <div className="end-page">
//           <h3 className='heading'>Congratulations! You completed the game.</h3>
//           <p>Total Time: {formatTime(totalTimeInSeconds)}</p>
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

// App.jsx

import React, { useState, useEffect, useRef } from 'react';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import Level5 from './Level5';
import Level6 from './Level6';
import './App.css';
import InstructionsPopup from './InstructionsPopup'; // Import InstructionsPopup component

const levels = [Level1, Level2, Level3, Level4, Level5, Level6];
const totalLevels = levels.length;

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(-1); // -1 indicates the start page
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false); // State to control showing InstructionsPopup
  const audioRef = useRef(null);

  useEffect(() => {
    if (startTime !== 0 && currentLevel >= totalLevels) {
      setEndTime(Date.now()); // Record end time when all levels are completed
    }
  }, [currentLevel, startTime, totalLevels]);

  const nextLevel = () => {
    setCurrentLevel(prevLevel => Math.min(prevLevel + 1, totalLevels));
  };

  const prevLevel = () => {
    setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
  };

  const renderLevel = () => {
    if (currentLevel === -1) {
      return (
        <div className="start-page">
          <h3 className='heading'>Animal Matching Game</h3>
          
          <button className="button-74" onClick={() => setShowInstructions(true)}>
            Start playing
          </button>
          {showInstructions && (
            <InstructionsPopup onClose={() => {
              setCurrentLevel(0);
              setStartTime(Date.now()); // Start the timer
              setShowInstructions(false); // Close InstructionsPopup
            }} />
          )}
        </div>
      );
    } else if (currentLevel < totalLevels) {
      const LevelComponent = levels[currentLevel];
      return <LevelComponent onNext={nextLevel} onPrev={prevLevel} onLevelComplete={handleLevelComplete} />;
    } else {
      const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
      return (
        <div className="end-page">
          <h3 className='heading' style={{fontSize: '50px'}}>Congratulations! You completed the game.</h3>
          <img src="images/last.gif" style={{ width: '200px', height: 'auto' }} alt="Congratulations GIF" />

          <p style={{fontSize:'40px'}}>Total Time: {formatTime(totalTimeInSeconds)}</p>
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

      {currentLevel >= 0 && currentLevel < totalLevels && (
        <div className="button-container">
          <button className="button-74" onClick={prevLevel} disabled={currentLevel <= 0}>
            Previous
          </button>
          <button className="button-74" onClick={nextLevel} disabled={currentLevel === totalLevels}>
            Next
          </button>
        </div>
      )}

      <div className="level-container">
        {renderLevel()}
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default App;
