// import React, { useEffect, useRef, useState } from 'react';

// const Level2 = ({ onNext, onPrev }) => {
//   const pixiContainer = useRef(null);
//   const [trialCount, setTrialCount] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [timeTaken, setTimeTaken] = useState(null);

//   useEffect(() => {
//     if (!window.PIXI || !window.confetti || !window.TWEEN) {
//       console.error('PIXI, confetti, or TWEEN not loaded');
//       return;
//     }

//     // Initialize the PIXI application
//     const app = new window.PIXI.Application({
//       width: 1800,
//       height: 600,
//       backgroundColor: 0xD8F7F2,
//     });

//     if (pixiContainer.current) {
//       pixiContainer.current.appendChild(app.view);
//     }

//     // Record the start time when the component mounts
//     setStartTime(performance.now());
//     setTimeTaken(null);
//     setTrialCount(0);

//     app.loader
//       .add('image1', 'images/head.png')
//       .add('image2', 'images/tail.png')
//       .add('shad', 'images/headshad.png')
//       .add('deer', 'images/deerhead.png')
//       .load(setup);

//     let image1, image2, shad, deer;
//     const originalDeerPosition = { x: 1200, y: 0 };

//     function setup() {
//       image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
//       image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
//       shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);
//       deer = new window.PIXI.Sprite(app.loader.resources['deer'].texture);

//       image1.x = 1200;
//       image1.y = 280;
//       image2.x = 500;
//       image2.y = 100;
//       shad.x = 700;
//       shad.y = 100;
//       deer.x = originalDeerPosition.x;
//       deer.y = originalDeerPosition.y;

//       image1.interactive = true;
//       deer.interactive = true;

//       image1
//         .on('mousedown', onDragStart)
//         .on('mousemove', onDragMove)
//         .on('mouseup', onDragEnd)
//         .on('mouseupoutside', onDragEnd);

//       deer
//         .on('mousedown', onDragStart)
//         .on('mousemove', onDragMove)
//         .on('mouseup', onDragEnd)
//         .on('mouseupoutside', onDragEnd);

//       app.stage.addChild(shad);
//       app.stage.addChild(image1);
//       app.stage.addChild(image2);
//       app.stage.addChild(deer);
//     }

//     function onDragStart(event) {
//       this.data = event.data;
//       this.dragging = true;
//     }

//     function onDragMove() {
//       if (this.dragging) {
//         const newPosition = this.data.getLocalPosition(this.parent);
//         this.x = newPosition.x;
//         this.y = newPosition.y;
//       }
//     }

//     function onDragEnd() {
//       setTrialCount(prevCount => prevCount + 1); // Increment trial count
//       this.dragging = false;
//       this.data = null;

//       if (this === deer) {
//         shakeAndResetDeer();
//       } else {
//         if (Math.abs(image1.x - 700) < 10 && Math.abs(image1.y - 100) < 10) {
//           image1.x = 700;
//           image1.y = 100;
//         }

//         if (Math.abs(image1.x - 700) < 10 && Math.abs(image1.y - 100) < 10 && Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 100) < 10) {
//           // Calculate the time taken to complete the level
//           const endTime = performance.now();
//           const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
//           setTimeTaken(duration);
//           window.confetti();
//         }
//       }
//     }

//     function shakeAndResetDeer() {
//       const shakeAmplitude = 10;
//       const shakeDuration = 100;

//       const shake = new window.TWEEN.Tween(deer.position)
//         .to({ x: deer.x + shakeAmplitude }, shakeDuration)
//         .yoyo(true)
//         .repeat(5)
//         .onComplete(() => {
//           new window.TWEEN.Tween(deer.position)
//             .to({ x: originalDeerPosition.x, y: originalDeerPosition.y }, 500)
//             .start();
//         })
//         .start();
//     }

//     function animate(time) {
//       requestAnimationFrame(animate);
//       window.TWEEN.update(time);
//     }
//     requestAnimationFrame(animate);

//     return () => {
//       app.destroy(true, true);
//     };
//   }, [onNext]);

//   return (
//     <div>
//       <div ref={pixiContainer}></div>
//       <div>Trials: {trialCount}</div> {/* Display the trial count */}
//       {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>} {/* Display the time taken */}
//     </div>
//   );
// };

// // // export default Level2;

// import React, { useState, useRef } from 'react';
// import Draggable from 'react-draggable';

// const Level2 = ({ onNext, onPrev }) => {
//   const [trialCount, setTrialCount] = useState(0);
//   const [headPosition, setHeadPosition] = useState({ x: 900, y: 280 });
//   const [deerPosition, setDeerPosition] = useState({ x: 900, y: 0 });
//   const originalDeerPosition = { x: 900, y: 0 };
//   const tailPosition = { x: 500, y: 100 }; // Fixed position for the tail
//   const headShadowPosition = { x: 644, y: 100 };

//   const headRef = useRef(null);
//   const deerRef = useRef(null);

//   const incrementTrialCount = () => {
//     setTrialCount(prevCount => prevCount + 1);
//   };

//   const onStopHead = (e, data) => {
//     incrementTrialCount(); // Increment trial count when drag is stopped
//     const { x, y } = data;

//     if (Math.abs(x - headShadowPosition.x) < 10 && Math.abs(y - headShadowPosition.y) < 10) {
//       setHeadPosition(headShadowPosition);
//       window.confetti();
//     } else {
//       setHeadPosition({ x, y });
//     }
//   };

//   const onStopDeer = (e, data) => {
//     incrementTrialCount(); // Increment trial count when drag is stopped
//     shakeAndResetDeer();
//   };

//   const shakeAndResetDeer = () => {
//     const shakeAmplitude = 10;
//     const shakeDuration = 100;
//     let shakeCount = 0;
//     const shakeLimit = 5;

//     const shake = () => {
//       if (shakeCount < shakeLimit) {
//         shakeCount++;
//         setDeerPosition(prevPosition => ({
//           x: prevPosition.x + (shakeCount % 2 === 0 ? -shakeAmplitude : shakeAmplitude),
//           y: prevPosition.y,
//         }));
//         setTimeout(shake, shakeDuration);
//       } else {
//         setDeerPosition(originalDeerPosition);
//       }
//     };

//     shake();
//   };

//   return (
//     <div>
//       <div style={{ position: 'relative', width: '800px', height: '500px', backgroundColor: '#D8F7F2' }}>
//         <div
//           style={{
//             position: 'absolute',
//             width: '256px',
//             height: '256px',
//             background: 'url(images/tail.png) no-repeat',
//             backgroundSize: 'contain',
//             left: `${tailPosition.x}px`,
//             top: `${tailPosition.y}px`
//           }}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             width: '256px',
//             height: '256px',
//             background: 'url(images/headshad.png) no-repeat',
//             backgroundSize: 'contain',
//             left: `${headShadowPosition.x}px`,
//             top: `${headShadowPosition.y}px`
//           }}
//         />
//         <Draggable
//           position={headPosition}
//           onStop={onStopHead}
//           nodeRef={headRef}
//         >
//           <div
//             ref={headRef}
//             style={{
//               position: 'absolute',
//               width: '256px',
//               height: '256px',
//               background: 'url(images/head.png) no-repeat',
//               backgroundSize: 'contain'
//             }}
//           />
//         </Draggable>
//         <Draggable
//           position={deerPosition}
//           onStop={onStopDeer}
//           nodeRef={deerRef}
//         >
//           <div
//             ref={deerRef}
//             style={{
//               position: 'absolute',
//               width: '256px',
//               height: '256px',
//               background: 'url(images/deerhead.png) no-repeat',
//               backgroundSize: 'contain'
//             }}
//           />
//         </Draggable>
//       </div>
//       <div>Trials: {trialCount}</div>
//     </div>
//   );
// };

// export default Level2;
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const Level2 = ({ onNext, onPrev }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [headPosition, setHeadPosition] = useState({ x: 900, y: 280 });
  const [deerPosition, setDeerPosition] = useState({ x: 900, y: 0 });
  const [tailPosition, setTailPosition] = useState({ x: 0, y: 0 });
  const [headShadowPosition, setHeadShadowPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const headRef = useRef(null);
  const deerRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 500, height: 500 });
  const originalDeerPositionRef = useRef({ x: 900, y: 0 }); // Ref to store the original deer position

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
        setDeerPosition(originalDeerPositionRef.current); // Use the ref to reset the position
      }
    };

    shake();
  };

  const handleResize = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const newSize = { width: 450 * scale, height: 450 * scale };
    setImageSize(newSize);
    setTailPosition({ x: 420 * scale, y: 100 * scale });
    setHeadShadowPosition({ x: 644 * scale, y: 100 * scale });
    setHeadPosition({ x: 1000 * scale, y: 400 * scale });
    setDeerPosition({ x: 1000 * scale, y: 0 * scale });
    originalDeerPositionRef.current = { x: 1000 * scale, y: 0 * scale }; // Update the ref with the new position
    setScale(scale); // Set the scale for dynamic adjustments
  };

  useEffect(() => {
    handleResize(); // Call handleResize initially to set positions based on initial screen size
    window.addEventListener('resize', handleResize);

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
          background: 'url(images/tail.png) no-repeat',
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
          background: 'url(images/headshad.png) no-repeat',
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
            background: 'url(images/head.png) no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Draggable>
      <Draggable position={deerPosition} onStop={onStopDeer} nodeRef={deerRef}>
        <div
          ref={deerRef}
          style={{
            position: 'absolute',
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            background: 'url(images/deerhead.png) no-repeat',
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

export default Level2;
