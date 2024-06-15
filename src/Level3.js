// import React, { useEffect, useRef, useState } from 'react';

// const Level3 = ({ onNext, onPrev }) => {
//   const pixiContainer = useRef(null);
//   const [trialCount, setTrialCount] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [timeTaken, setTimeTaken] = useState(null);


//   useEffect(() => {
//     if (!window.PIXI || !window.confetti || !window.TWEEN) {
//       console.error('PIXI, confetti, or TWEEN not loaded');
//       return;
//     }
//     // Record the start time when the component mounts
//     setStartTime(performance.now());

//     const app = new window.PIXI.Application({
//       width: 1800,
//       height: 600,
//       backgroundColor: 0xD8F7F2,
//     });

//     if (pixiContainer.current) {
//       pixiContainer.current.appendChild(app.view);
//     }

//     app.loader
//                 .add('image1', 'images/tiger-split (1).png')
//                 .add('image2', 'images/tiger-split.png')
//                 .add('shad', 'images/tigershad.png')
//                 .add('deer', 'images/cheetahhead.png')
//                 .load(setup);

//             // Variables to store the images
//             var image1, image2,shad,deer;
//             const originalDeerPosition = { x: 1200, y: 0 };


//             function setup() {
//                 // Create sprites from the loaded images
//                 image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
//                 image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
//                 shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);
//                 deer = new window.PIXI.Sprite(app.loader.resources['deer'].texture);

//                 // Set initial positions
//                 image1.x = 734;
//                 image1.y = 100;
//                 image2.x = 1175;
//                 image2.y = 230;
//                 shad.x = 500;
//                 shad.y = 100;
//                 deer.x = originalDeerPosition.x;
//                 deer.y = originalDeerPosition.y;

//                 // Enable interactivity
//                 image2.interactive = true;
//                 deer.interactive = true;

//                 // Set up events for dragging
//                 image2
//                     .on('mousedown', onDragStart)
//                     .on('mousemove', onDragMove)
//                     .on('mouseup', onDragEnd)
//                     .on('mouseupoutside', onDragEnd);
                
//                 deer
//                     .on('mousedown', onDragStart)
//                     .on('mousemove', onDragMove)
//                     .on('mouseup', onDragEnd)
//                     .on('mouseupoutside', onDragEnd);
//                 // Add images to the stage
//                 app.stage.addChild(shad);
//                 app.stage.addChild(image1);
//                 app.stage.addChild(image2);
//                 app.stage.addChild(deer);
                
//             }

//             // Drag functions
//             function onDragStart(event) {
//                 this.data = event.data;
//                 this.dragging = true;
//             }

//             function onDragMove() {
//                 if (this.dragging) {
//                     var newPosition = this.data.getLocalPosition(this.parent);
//                     this.x = newPosition.x;
//                     this.y = newPosition.y;
//                 }
//             }

//             function onDragEnd() {
//               setTrialCount(prevCount => prevCount + 1); // Increment trial count

//                 this.dragging = false;
//                 this.data = null;

//                 if (this === deer) {
//                     shakeAndResetDeer();
//                 }
//                 if(Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 100) < 10){
//                     image2.x = 500;
//                     image2.y = 100
//                 }

//                 // Check if images are in a specific position
//                 if (Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 100) < 10 ) {
//                   // Calculate the time taken to complete the level
//         const endTime = performance.now();
//         const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
//         setTimeTaken(duration);
//                     // Trigger confetti effect
//                     window.confetti();
//                 }
//             }

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

// export default Level3;



// import React, { useEffect, useState, useRef } from 'react';
// import Draggable from 'react-draggable';

// const Level3 = ({ onNext, onPrev }) => {
//   const [trialCount, setTrialCount] = useState(0);
//   const [headPosition, setHeadPosition] = useState({ x: 1000, y: 280 });
//   const [deerPosition, setDeerPosition] = useState({ x: 1000, y: 20 });
//   const originalDeerPosition = { x: 1000, y: 20 };
//   const tailPosition = { x: 599, y: 100 }; // Fixed position for the tail
//   const headShadowPosition = { x: 350, y: 100 };

//   const headRef = useRef(null);
//   const deerRef = useRef(null);

//   // useEffect(() => {
//   //   setTrialCount(0);
//   // }, [onNext]);

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
//             width: '300px', // Set the correct width for the image
//             height: '256px', // Set the correct height for the image
//             background: 'url(images/tigerbody.png) no-repeat',
//             backgroundSize: 'contain',
//             left: `${tailPosition.x}px`,
//             top: `${tailPosition.y}px`
//           }}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             width: '256px', // Set the correct width for the image
//             height: '256px', // Set the correct height for the image
//             background: 'url(images/tigershad.png) no-repeat',
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
//               background: 'url(images/tiger-split.png) no-repeat',
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
//               background: 'url(images/cheetahhead.png) no-repeat',
//               backgroundSize: 'contain'
//             }}
//           />
//         </Draggable>
//       </div>
//       <div>Trials: {trialCount}</div>
//     </div>
//   );
// };

// export default Level3;
import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';

const Level3 = ({ onNext, onPrev }) => {
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

  return (
    <div style={{ position: 'relative', backgroundColor: '#D8F7F2', height: 'calc(100vh - 100px)', zIndex: 1 }}>
      <div
        style={{
          position: 'absolute',
          width: `${imageSize.width + 35}px`,
          height: `${imageSize.height}px`,
          background: 'url(images/tigerbody.png) no-repeat',
          backgroundSize: 'contain',
          left: `${tailPosition.x}px`,
          top: `${tailPosition.y - 4}px`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
          background: 'url(images/tigershad.png) no-repeat',
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
            background: 'url(images/tiger-split.png) no-repeat',
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
            background: 'url(images/cheetahhead.png) no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Draggable>
      <div
        style={{
          position: 'absolute',
          top: `${120 * scale}px`,
          right: '10px',
          fontSize: `${30 * scale}px`,
          zIndex: 2
        }}
      >
        Trials: {trialCount}
      </div>
    </div>
  );
};

export default Level3;
