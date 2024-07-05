
import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import tail from '../assets/images/tigerbody.png'; 
import head from '../assets/images/tiger-split.png';
import headshad from '../assets/images/tigershad.png';
import deerhead from '../assets/images/deerhead.png';
const Level3 = ({ onNext, onPrev,updateTrialCount }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [headPosition, setHeadPosition] = useState({ x: 1000, y: 280 });
  const [deerPosition, setDeerPosition] = useState({ x: 1000, y: 20 });
  const [tailPosition, setTailPosition] = useState({ x: 0, y: 0 });
  const [headShadowPosition, setHeadShadowPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const headRef = useRef(null);
  const deerRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });
  const originalDeerPositionRef = useRef({ x: 1000, y: 20 });

  const incrementTrialCount = () => {
    setTrialCount((prevCount) => prevCount + 1);
    updateTrialCount(1);
  };

  const onStopHead = (e, data) => {
    incrementTrialCount();
    const { x, y } = data;

    if (Math.abs(x - headShadowPosition.x) < 10 && Math.abs(y - headShadowPosition.y) < 10) {
      setHeadPosition(headShadowPosition);
      window.confetti();
    } else {
      setHeadPosition({ x, y });
    }
  };

  const onStopDeer = (e, data) => {
    incrementTrialCount();
    shakeAndResetDeer();
  };

  const shakeAndResetDeer = () => {
    const shakeAmplitude = 10;
    const shakeDuration = 100;
    let shakeCount = 0;
    const shakeLimit = 5;

    const shake = () => {
      if (shakeCount < shakeLimit) {
        shakeCount++;
        setDeerPosition((prevPosition) => ({
          x: prevPosition.x + (shakeCount % 2 === 0 ? -shakeAmplitude : shakeAmplitude),
          y: prevPosition.y,
        }));
        setTimeout(shake, shakeDuration);
      } else {
        setDeerPosition(originalDeerPositionRef.current);
      }
    };

    shake();
  };

  const handleResize = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const newSize = { width: 400 * scale, height: 400 * scale };
    setImageSize(newSize);
    setTailPosition({ x: 589 * scale, y: 110 * scale });
    setHeadShadowPosition({ x: 200 * scale, y: 100 * scale });
    setHeadPosition({ x: 1000 * scale, y: 400 * scale });
    setDeerPosition({ x: 1000 * scale, y: 20 * scale });
    originalDeerPositionRef.current = { x: 1000 * scale, y: 20 * scale };
    setScale(scale); // Set the scale for dynamic adjustments
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

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
          width: `${imageSize.width + 35}px`,
          height: `${imageSize.height}px`,
          backgroundImage: `url(${tail})`,
          left: `${tailPosition.x}px`,
          top: `${tailPosition.y - 4}px`,
        }}
      />
      <div
        style={{
          ...commonStyle,
          backgroundImage: `url(${headshad})`,
          
          left: `${headShadowPosition.x}px`,
          top: `${headShadowPosition.y}px`,
        }}
      />
      <Draggable position={headPosition} onStop={onStopHead} nodeRef={headRef}>
        <div
          ref={headRef}
          style={{
            ...commonStyle,
            backgroundImage: `url(${head})`,
           
          }}
        />
      </Draggable>
      <Draggable position={deerPosition} onStop={onStopDeer} nodeRef={deerRef}>
        <div
          ref={deerRef}
          style={{
            ...commonStyle,
            backgroundImage: `url(${deerhead})`,
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

export default Level3;
