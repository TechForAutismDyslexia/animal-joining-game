
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

// export default App;

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
import React, { useState, useEffect, useRef } from 'react';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import './App.css';

const levels = [Level1, Level2, Level3, Level4];

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentLevel]);

  useEffect(() => {
    const handleResize = () => {
      const scale = Math.min(window.innerWidth / 800, window.innerHeight / 800);
      setScaleFactor(scale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextLevel = () => {
    setCurrentLevel(prevLevel => Math.min(prevLevel + 1, levels.length - 1));
  };

  const prevLevel = () => {
    setCurrentLevel(prevLevel => Math.max(prevLevel - 1, 0));
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
    <div className="app-container" style={{ transform: `scale(${scaleFactor})` }}>
      <div className="audio-player">
        <audio ref={audioRef} src="images/inst.mp3" />
        <button className="button-74" onClick={toggleAudio} style={{ fontSize: `${50 * scaleFactor}px` }}>
          {isPlaying ? 'Pause' : 'Instruction'}
        </button>
      </div>

      <div className="timer" style={{ fontSize: `${40 * scaleFactor}px` }}>
        Timer: {formatTime(timer)}
      </div>

      <div className="button-container">
        <button className="button-74" onClick={prevLevel} disabled={currentLevel === 0} style={{ fontSize: `${50 * scaleFactor}px` }}>
          Previous
        </button>
        <button className="button-74" onClick={nextLevel} disabled={currentLevel === levels.length - 1} style={{ fontSize: `${50 * scaleFactor}px` }}>
          Next
        </button>
      </div>

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
