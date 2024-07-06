
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import hippoback from '../assets/images/hippoback.png'; 
import hippofront from '../assets/images/hippofront.png';
import hipposplitshad from '../assets/images/hippo-splitshad.png';

const Level1 = ({ onNext, onPrev, updateTrialCount, throwConfetti }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [headPosition, setHeadPosition] = useState({ x: 100, y: 100 });
  const [tailPosition, setTailPosition] = useState({ x: 0, y: 0 });
  const [headShadowPosition, setHeadShadowPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const headRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });

  const incrementTrialCount = () => {
    setTrialCount((prevCount) => prevCount + 1);
    updateTrialCount(1);
  };

  const onStopHead = (e, data) => {
    incrementTrialCount(); 
    const { x, y } = data;

    if (Math.abs(x - headShadowPosition.x) < 10 && Math.abs(y - headShadowPosition.y) < 10) {
      setHeadPosition(headShadowPosition);
      throwConfetti();
    } else {
      setHeadPosition({ x, y });
    }
  };

  const handleResize = () => {
    const newScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const newSize = { width: 400 * newScale, height: 400 * newScale };
    setImageSize(newSize);
    setTailPosition({ x: 920 * newScale, y: 100 * newScale });
    setHeadShadowPosition({ x: 538.5 * newScale, y: 100 * newScale });
    setHeadPosition({ x: 100 * newScale, y: 100 * newScale });
    setScale(newScale);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // initial call

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', backgroundColor: '#D8F7F2', height: 'calc(100vh - 100px)', zIndex: 1 }}>
      <div
        className='images'
        style={{
          position: 'absolute',
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
          backgroundImage: `url(${hippoback})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          left: `${tailPosition.x}px`,
          top: `${tailPosition.y}px`,
        }}
      />
      <div
        className='images'
        style={{
          position: 'absolute',
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
          backgroundImage: `url(${hipposplitshad})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          left: `${headShadowPosition.x}px`,
          top: `${headShadowPosition.y}px`,
        }}
      />
      <Draggable
        position={headPosition}
        onStop={onStopHead}
        nodeRef={headRef}
      >
        <div
          className='images'
          ref={headRef}
          style={{
            position: 'absolute',
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            backgroundImage: `url(${hippofront})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Draggable>
      <div
        style={{
          position: 'absolute',
          top: `${150 * scale}px`,
          right: '10px',
          fontSize: `${50 * scale}px`,
          zIndex: 2
        }}
      >
        Trials: {trialCount}
      </div>
    </div>
  );
};

export default Level1;
