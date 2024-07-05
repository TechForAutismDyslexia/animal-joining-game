
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import tail from '../assets/images/tail.png'; 
import head from '../assets/images/head.png';
import headshad from '../assets/images/headshad.png';
import deerhead from '../assets/images/deerhead.png';
const Level2 = ({ updateTrialCount }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [positions, setPositions] = useState({
    head: { x: 1000, y: 400 },
    deer: { x: 1000, y: 0 },
    tail: { x: 420, y: 100 },
    headShadow: { x: 644, y: 100 },
  });
  const [scale, setScale] = useState(1);


  const headRef = useRef(null);
  const deerRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 500, height: 500 });
  const originalDeerPositionRef = useRef({ x: 1000, y: 0 });

  const incrementTrialCount = () => {
    setTrialCount((prevCount) => prevCount + 1);
    updateTrialCount(1);
  };

  const onStopHead = (e, data) => {
    incrementTrialCount();
    const { x, y } = data;
    if (Math.abs(x - positions.headShadow.x) < 10 && Math.abs(y - positions.headShadow.y) < 10) {
      setPositions((prev) => ({ ...prev, head: positions.headShadow }));
      window.confetti();
    } else {
      setPositions((prev) => ({ ...prev, head: { x, y } }));
    }
  };

  const onStopDeer = () => {
    incrementTrialCount();
    shakeAndResetDeer();
  };

  const shakeAndResetDeer = () => {
    let shakeCount = 0;
    const shake = () => {
      if (shakeCount < 5) {
        shakeCount++;
        setPositions((prev) => ({
          ...prev,
          deer: { ...prev.deer, x: prev.deer.x + (shakeCount % 2 === 0 ? -10 : 10) },
        }));
        setTimeout(shake, 100);
      } else {
        setPositions((prev) => ({ ...prev, deer: originalDeerPositionRef.current }));
      }
    };
    shake();
  };

  const handleResize = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    setImageSize({ width: 450 * scale, height: 450 * scale });
    setPositions({
      head: { x: 1000 * scale, y: 400 * scale },
      deer: { x: 1000 * scale, y: 0 * scale },
      tail: { x: 420 * scale, y: 100 * scale },
      headShadow: { x: 644 * scale, y: 100 * scale },
    });
    originalDeerPositionRef.current = { x: 1000 * scale, y: 0 * scale };
    setScale(scale);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const commonStyle = {position: 'absolute',width: `${imageSize.width}px`,height: `${imageSize.height}px`,backgroundRepeat: 'no-repeat',backgroundSize: 'contain',};

  return (
    <div style={{ position: 'relative', backgroundColor: '#D8F7F2', height: 'calc(100vh - 100px)', zIndex: 1 }}>
      <div
        style={{
          ...commonStyle,
          backgroundImage: `url(${tail})`,
          left: `${positions.tail.x}px`,
          top: `${positions.tail.y}px`,
        }}
      />
      <div
        style={{
          ...commonStyle,
          backgroundImage: `url(${headshad})`,
          left: `${positions.headShadow.x}px`,
          top: `${positions.headShadow.y}px`,
        }}
      />
      <Draggable position={positions.head} onStop={onStopHead} nodeRef={headRef}>
        <div
          ref={headRef}
          style={{
            ...commonStyle,
            backgroundImage: `url(${head})`,
          }}
        />
      </Draggable>
      <Draggable position={positions.deer} onStop={onStopDeer} nodeRef={deerRef}>
        <div
          ref={deerRef}
          style={{
            ...commonStyle,
            backgroundImage: `url(${deerhead})`,
          }}
        />
      </Draggable>
      <div
        style={{position: 'absolute',top: `${150 * scale}px`,right: '10px',fontSize: `${50 * scale}px`,zIndex: 2,
        }}
      >
        Trials: {trialCount}
      </div>
    </div>
  );
};

export default Level2;
