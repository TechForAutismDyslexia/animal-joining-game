// import React, { useEffect, useState } from 'react';
// import Draggable from 'react-draggable';

// const Level1 = ({ onNext, onPrev }) => {
//   const [trialCount, setTrialCount] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [timeTaken, setTimeTaken] = useState(null);

//   useEffect(() => {
//     // Record the start time when the component mounts
//     setStartTime(performance.now());
//   }, []);

//   const handleDragStop = (e, data) => {
//     setTrialCount(prevCount => prevCount + 1); // Increment trial count

//     // Check if the element is within the target area
//     if (Math.abs(data.x - 450) < 10 && Math.abs(data.y - 0) < 10) {
//       // Snap to target position
//       data.node.style.transform = 'translate(450px, 0px)';

//       // Calculate the time taken to complete the level
//       const endTime = performance.now();
//       const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
//       setTimeTaken(duration);

//       // Trigger confetti (Assuming window.confetti is available)
//       if (window.confetti) {
//         window.confetti();
//       }
//     }
//   };

//   return (
//     <div>
//       <div style={{ width: '1800px', height: '600px', backgroundColor: '#D8F7F2', position: 'relative' }}>
//         <img
//           src="images/hippo-splitshad.png"
//           alt="shadow"
//           style={{ position: 'absolute', left: '500px', top: '100px' }}
//         />
//         <img
//           src="images/hippo-split (1).png"
//           alt="image1"
//           style={{ position: 'absolute', left: '843px', top: '100px' }}
//         />
//         <Draggable onStop={handleDragStop}>
//           <img
//             src="images/hippo-split.png"
//             alt="image2"
//             style={{ position: 'absolute', left: '50px', top: '100px', cursor: 'pointer' }}
//           />
//         </Draggable>
//       </div>
//       <div>Trials: {trialCount}</div> {/* Display the trial count */}
//       {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>} {/* Display the time taken */}
//     </div>
//   );
// };

// export default Level1;

import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import confetti from 'canvas-confetti';

const Level1 = ({ onNext, onPrev }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  useEffect(() => {
    // Record the start time when the component mounts
    setStartTime(performance.now());

    // Update elapsed time every second
    const interval = setInterval(() => {
      if (startTime && !confettiTriggered) {
        setElapsedTime(Math.round((performance.now() - startTime) / 1000));
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [startTime, confettiTriggered]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.6 },
    });
    setConfettiTriggered(true); // Set confetti triggered to true
  };

  const handleDragStop = (e, data) => {
    setTrialCount((prevCount) => prevCount + 1); // Increment trial count

    // Check if the element is within the target area
    const targetX = 450;
    const targetY = 0;
    const tolerance = 20;

    if (Math.abs(data.x - targetX) < tolerance && Math.abs(data.y - targetY) < tolerance) {
      // Snap to target position
      e.target.style.transform = `translate(${targetX}px, ${targetY}px)`;

      // Calculate the time taken to complete the level
      const endTime = performance.now();
      const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
      setTimeTaken(duration);

      // Trigger confetti
      triggerConfetti();
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Time: {elapsedTime} seconds
      </div>
      <div style={{ width: '800px', height: '600px', backgroundColor: '#D8F7F2', position: 'relative' }}>
        <img
          src="images/hippo-splitshad.png"
          alt="shadow"
          style={{ position: 'absolute', left: '500px', top: '100px' }}
        />
        <img
          src="images/hippo-split (1).png"
          alt="image1"
          style={{ position: 'absolute', left: '843px', top: '100px' }}
        />
        <Draggable onStop={handleDragStop}>
          <img
            src="images/hippo-split.png"
            alt="image2"
            style={{ position: 'absolute', left: '50px', top: '100px', cursor: 'pointer' }}
          />
        </Draggable>
      </div>
      <div>Trials: {trialCount}</div> {/* Display the trial count */}
      {/* {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>} Display the time taken */}
    </div>
  );
};

export default Level1;

