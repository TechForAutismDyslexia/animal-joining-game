import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';

const Level3 = ({ onNext, onPrev }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [headPosition, setHeadPosition] = useState({ x: 1000, y: 280 });
  const [deerPosition1, setDeerPosition1] = useState({ x: 1000, y: 400 });
  const [deerPosition2, setDeerPosition2] = useState({ x: 1200, y: 400 });
  const [tailPosition, setTailPosition] = useState({ x: 0, y: 0 });
  const [headShadowPosition, setHeadShadowPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const headRef = useRef(null);
  const deerRef1 = useRef(null);
  const deerRef2 = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });
  const originalDeerPositionRef1 = useRef({ x: 900, y: 400 });
  const originalDeerPositionRef2 = useRef({ x: 1200, y: 300 });

  const incrementTrialCount = () => {
    setTrialCount((prevCount) => prevCount + 1);
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

  const onStopDeer1 = (e, data) => {
    incrementTrialCount();
    shakeAndResetDeer(setDeerPosition1, originalDeerPositionRef1);
  };

  const onStopDeer2 = (e, data) => {
    incrementTrialCount();
    shakeAndResetDeer(setDeerPosition2, originalDeerPositionRef2);
  };

  const shakeAndResetDeer = (setDeerPosition, originalDeerPositionRef) => {
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
    const newSize = { width: 350 * scale, height: 350 * scale };
    setImageSize(newSize);
    setTailPosition({ x: 200 * scale, y: 200 * scale });
    setHeadShadowPosition({ x: 445 * scale, y: 200 * scale });
    setHeadPosition({ x: 1250 * scale, y: 300 * scale });
    setDeerPosition1({ x: 900 * scale, y: 400 * scale });
    setDeerPosition2({ x: 900 * scale, y: 10 * scale });
    originalDeerPositionRef1.current = { x: 900 * scale, y: 400 * scale };
    originalDeerPositionRef2.current = { x: 900 * scale, y: 10 * scale };
    setScale(scale); // Set the scale for dynamic adjustments
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', backgroundColor: '#D8F7F2', height: 'calc(100vh - 100px)', zIndex: 1 }}>
      <div
        style={{
          position: 'absolute',
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
          background: 'url(images/pighead.png) no-repeat',
          backgroundSize: 'contain',
          left: `${tailPosition.x}px`,
          top: `${tailPosition.y}px`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
          background: 'url(images/pigshad.png) no-repeat',
          backgroundSize: 'contain',
          left: `${headShadowPosition.x}px`,
          top: `${headShadowPosition.y}px`,
        }}
      />
      <Draggable position={headPosition} onStop={onStopHead} nodeRef={headRef}>
        <div
          ref={headRef}
          style={{
            position: 'absolute',
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            background: 'url(images/pigtail.png) no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Draggable>
      <Draggable position={deerPosition1} onStop={onStopDeer1} nodeRef={deerRef1}>
        <div
          ref={deerRef1}
          style={{
            position: 'absolute',
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            background: 'url(images/eagletail.png) no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Draggable>
      <Draggable position={deerPosition2} onStop={onStopDeer2} nodeRef={deerRef2}>
        <div
          ref={deerRef2}
          style={{
            position: 'absolute',
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            background: 'url(images/whaletail.png) no-repeat',
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

export default Level3;
