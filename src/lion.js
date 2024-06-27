
import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';

const Level4 = ({ onNext, onPrev }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [image1Position, setImage1Position] = useState({ x: 1, y: 100 });
  const [image2Position, setImage2Position] = useState({ x: 1, y: 400 });
  const [image3Position, setImage3Position] = useState({ x: 800, y: 400 });
  const [image4Position, setImage4Position] = useState({ x: 800, y: 100 });
  const shadPosition = { x: 400, y: 150 }; // Fixed position for the shadow

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const image4Ref = useRef(null);

  useEffect(() => {
    setStartTime(performance.now());
    setTimeTaken(null);
    setTrialCount(0);
  }, [onNext]);

  const onStop = (e, data, setPosition, positionOffset) => {
    setTrialCount(prevCount => prevCount + 1);
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);

    // Snap to position if close enough
    const onStop = (e, data, setPosition, positionOffset, imageNumber) => {
      setTrialCount(prevCount => prevCount + 1);
      const newPosition = { x: data.x, y: data.y };
      setPosition(newPosition);
    
      // Define the snap positions for each image
      const snapPositions = [
        { x: shadPosition.x, y: shadPosition.y },
        { x: shadPosition.x, y: shadPosition.y },
        { x: shadPosition.x, y: shadPosition.y + 250 },
        { x: shadPosition.x, y: shadPosition.y }
      ];
    
      // Snap to position if close enough
      const snapDistance = 10;
      const snapPosition = snapPositions[imageNumber - 1];
      if (
        Math.abs(newPosition.x - snapPosition.x) < snapDistance &&
        Math.abs(newPosition.y - snapPosition.y) < snapDistance
      ) {
        setPosition(snapPosition);
      }
    
      // Check if all images are in the correct position
      if (
        Math.abs(image1Position.x - snapPositions[0].x) < 5 && Math.abs(image1Position.y - snapPositions[0].y) < 5 &&
        Math.abs(image2Position.x - snapPositions[1].x) < 5 && Math.abs(image2Position.y - snapPositions[1].y) < 5 &&
        Math.abs(image3Position.x - snapPositions[2].x) < 5 && Math.abs(image3Position.y - snapPositions[2].y) < 5 &&
        Math.abs(image4Position.x - snapPositions[3].x) < 5 && Math.abs(image4Position.y - snapPositions[3].y) < 5
      ) {
        const endTime = performance.now();
        const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
        setTimeTaken(duration);
        window.confetti();
      }
    };
    
  };

  return (
    <div>
      <div style={{ position: 'relative', width: '800px', height: '600px', backgroundColor: '#D8F7F2' }}>
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'url(images/lionshadow1.png) no-repeat',
            backgroundSize: 'contain',
            left: `${shadPosition.x}px`,
            top: `${shadPosition.y}px`
          }}
        />
        <Draggable
          position={image1Position}
          onStop={(e, data) => onStop(e, data, setImage1Position, { x: 0, y: 0 })}
          nodeRef={image1Ref}
        >
          <div
            ref={image1Ref}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              background: 'url(images/l1.png) no-repeat',
              backgroundSize: 'contain'
            }}
          />
        </Draggable>
        <Draggable
          position={image2Position}
          onStop={(e, data) => onStop(e, data, setImage2Position, { x: 0, y: 250 })}
          nodeRef={image2Ref}
        >
          <div
            ref={image2Ref}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              background: 'url(images/l2.png) no-repeat',
              backgroundSize: 'contain'
            }}
          />
        </Draggable>
        <Draggable
          position={image3Position}
          onStop={(e, data) => onStop(e, data, setImage3Position, { x: 400, y: 250 })}
          nodeRef={image3Ref}
        >
          <div
            ref={image3Ref}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              background: 'url(images/l3.png) no-repeat',
              backgroundSize: 'contain'
            }}
          />
        </Draggable>
        <Draggable
          position={image4Position}
          onStop={(e, data) => onStop(e, data, setImage4Position, { x: 400, y: 0 })}
          nodeRef={image4Ref}
        >
          <div
            ref={image4Ref}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              background: 'url(images/l4.png) no-repeat',
              backgroundSize: 'contain'
            }}
          />
        </Draggable>
      </div>
      <div>Trials: {trialCount}</div>
      {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>}
    </div>
  );
};

export default Level4;
