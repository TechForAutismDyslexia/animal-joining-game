import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const Level1 = ({ onNext, onPrev }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    // Record the start time when the component mounts
    setStartTime(performance.now());
  }, []);

  const handleDragStop = (e, data) => {
    setTrialCount(prevCount => prevCount + 1); // Increment trial count

    // Check if the element is within the target area
    if (Math.abs(data.x - 450) < 10 && Math.abs(data.y - 0) < 10) {
      // Snap to target position
      data.node.style.transform = 'translate(450px, 0px)';

      // Calculate the time taken to complete the level
      const endTime = performance.now();
      const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
      setTimeTaken(duration);

      // Trigger confetti (Assuming window.confetti is available)
      if (window.confetti) {
        window.confetti();
      }
    }
  };

  return (
    <div>
      <div style={{ width: '1800px', height: '600px', backgroundColor: '#D8F7F2', position: 'relative' }}>
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
      {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>} {/* Display the time taken */}
    </div>
  );
};

export default Level1;
