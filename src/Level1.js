
// import React, { useEffect, useState } from 'react';
// import Draggable from 'react-draggable';
// import confetti from 'canvas-confetti';

// const Level1 = ({ onNext, onPrev }) => {
//   const [trialCount, setTrialCount] = useState(0);
//   const [confettiTriggered, setConfettiTriggered] = useState(false);

//   const triggerConfetti = () => {
//     confetti({
//       particleCount: 300,
//       spread: 160,
//       origin: { y: 0.6 },
//     });
//     setConfettiTriggered(true); // Set confetti triggered to true
//   };

//   const handleDragStop = (e, data) => {
//     setTrialCount((prevCount) => prevCount + 1); // Increment trial count

//     // Check if the element is within the target area
//     const targetX = 450;
//     const targetY = 0;
//     const tolerance = 20;

//     if (Math.abs(data.x - targetX) < tolerance && Math.abs(data.y - targetY) < tolerance) {
//       // Snap to target position
//       e.target.style.transform = `translate(${targetX}px, ${targetY}px)`;

//       // Trigger confetti
//       triggerConfetti();
//     }
//   };

//   return (
//     <div>
      
//       <div style={{ width: '800px', height: '600px', backgroundColor: '#D8F7F2', position: 'relative' }}>
//         <img
//           src="images/hippo-splitshad.png"
//           alt="shadow"
//           style={{ position: 'absolute', left: '500px', top: '100px' }}
//         />
//         <img
//           src="images/hippoback.png"
//           alt="image1"
//           style={{ position: 'absolute', left: '842px', top: '100px' }}
//         />
//         <Draggable onStop={handleDragStop}>
//           <img
//             src="images/hippofront.png"
//             alt="image2"
//             style={{ position: 'absolute', left: '50px', top: '100px', cursor: 'pointer' }}
//           />
//         </Draggable>
//       </div>
//       <div>Trials: {trialCount}</div> {/* Display the trial count */}
//     </div>
//   );
// };

// export default Level1;


// import React, { useState, useRef } from 'react';
// import Draggable from 'react-draggable';

// const Level1 = ({ onNext, onPrev }) => {
//   const [trialCount, setTrialCount] = useState(0);
//   const [headPosition, setHeadPosition] = useState({ x: 100, y: 100 });
//   const tailPosition = { x: 688, y: 100 }; // Fixed position for the tail
//   const headShadowPosition = { x: 444, y: 100 };

//   const headRef = useRef(null);

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



//   return (
//     <div>
//       <div style={{ position: 'relative', backgroundColor: '#D8F7F2' }}>

//         <div className= 'images'
//           style={{
//             position: 'absolute',
//             width: '256px',
//             height: '256px',
//             background: 'url(images/hippoback.png) no-repeat',
//             backgroundSize: 'contain',
//             left: `${tailPosition.x}px`,
//             top: `${tailPosition.y}px`
//           }}
//         />
//         <div className= 'images'
//           style={{ 
//             position: 'absolute',
//             width: '256px',
//             height: '256px',
//             background: 'url(images/hippo-splitshad.png) no-repeat',
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
//           <div className= 'images'
//             ref={headRef}
//             style={{
//               position: 'absolute',
//               width: '256px',
//               height: '256px',
//               background: 'url(images/hippofront.png) no-repeat',
//               backgroundSize: 'contain'
//             }}
//           />
//         </Draggable>
        
//       </div>
//       <div style= {{position: 'absolute', top: '120px', right: '10px', fontSize: '30px'}} >Trials: {trialCount}</div>
//     </div>
//   );
// };

// export default Level1;


// import React, { useState, useRef, useEffect } from 'react';
// import Draggable from 'react-draggable';
// import './style.css';

// const Level1 = ({ onNext, onPrev }) => {
//   const [trialCount, setTrialCount] = useState(0);
//   const [headPosition, setHeadPosition] = useState({ x: 100, y: 100 });
//   const [tailPosition, setTailPosition] = useState({ x: 0, y: 0 });
//   const [headShadowPosition, setHeadShadowPosition] = useState({ x: 0, y: 0 });

//   const headRef = useRef(null);
//   const [imageSize, setImageSize] = useState({ width: 500, height: 500 });

//   const incrementTrialCount = () => {
//     setTrialCount((prevCount) => prevCount + 1);
//   };

//   const onStopHead = (e, data) => {
//     incrementTrialCount(); // Increment trial count when drag is stopped
//     const { x, y } = data;

//     if (
//       Math.abs(x - headShadowPosition.x) < 10 &&
//       Math.abs(y - headShadowPosition.y) < 10
//     ) {
//       setHeadPosition(headShadowPosition);
//       window.confetti();
//     } else {
//       setHeadPosition({ x, y });
//     }
//   };

//   const handleResize = () => {
//     const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
//     const newSize = { width: 500 * scale, height: 500 * scale };
//     setImageSize(newSize);
//     setTailPosition({ x: 920 * scale, y: 100 * scale });
//     setHeadShadowPosition({ x: 444 * scale, y: 100 * scale });
//     setHeadPosition({ x: 100 * scale, y: 100 * scale });
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     handleResize(); // initial call

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div>
//       <div style={{ position: 'relative', backgroundColor: '#D8F7F2', height: '100vh' }}>
//         <div
//           className='images'
//           style={{
//             position: 'absolute',
//             width: `${imageSize.width}px`,
//             height: `${imageSize.height}px`,
//             background: 'url(images/hippoback.png) no-repeat',
//             backgroundSize: 'contain',
//             left: `${tailPosition.x}px`,
//             top: `${tailPosition.y}px`,
//           }}
//         />
//         <div
//           className='images'
//           style={{
//             position: 'absolute',
//             width: `${imageSize.width}px`,
//             height: `${imageSize.height}px`,
//             background: 'url(images/hippo-splitshad.png) no-repeat',
//             backgroundSize: 'contain',
//             left: `${headShadowPosition.x}px`,
//             top: `${headShadowPosition.y}px`,
//           }}
//         />
//         <Draggable
//           position={headPosition}
//           onStop={onStopHead}
//           nodeRef={headRef}
//         >
//           <div
//             className='images'
//             ref={headRef}
//             style={{
//               position: 'absolute',
//               width: `${imageSize.width}px`,
//               height: `${imageSize.height}px`,
//               background: 'url(images/hippofront.png) no-repeat',
//               backgroundSize: 'contain',
//             }}
//           />
//         </Draggable>
//       </div>
//       <div style={{ position: 'absolute', top: '120px', right: '10px', fontSize: '30px' }}>Trials: {trialCount}</div>
//     </div>
//   );
// };

// export default Level1;
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import './style.css';

const Level1 = ({ onNext, onPrev, scaleFactor }) => {
  const [trialCount, setTrialCount] = useState(0);
  const [headPosition, setHeadPosition] = useState({ x: 100, y: 100 });
  const [tailPosition, setTailPosition] = useState({ x: 0, y: 0 });
  const [headShadowPosition, setHeadShadowPosition] = useState({ x: 0, y: 0 });

  const headRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });

  const incrementTrialCount = () => {
    setTrialCount((prevCount) => prevCount + 1);
  };

  const onStopHead = (e, data) => {
    incrementTrialCount(); // Increment trial count when drag is stopped
    const { x, y } = data;

    if (
      Math.abs(x - headShadowPosition.x) < 10 &&
      Math.abs(y - headShadowPosition.y) < 10
    ) {
      setHeadPosition(headShadowPosition);
      window.confetti();
    } else {
      setHeadPosition({ x, y });
    }
  };

  const handleResize = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const newSize = { width: 400 * scale, height: 400 * scale };
    setImageSize(newSize);
    setTailPosition({ x: 920 * scale, y: 100 * scale });
    setHeadShadowPosition({ x: 538.5 * scale, y: 100 * scale });
    setHeadPosition({ x: 100 * scale, y: 100 * scale });
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
          background: 'url(images/hippoback.png) no-repeat',
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
          background: 'url(images/hippo-splitshad.png) no-repeat',
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
            background: 'url(images/hippofront.png) no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Draggable>
      <div style={{ position: 'absolute', top: '120px', right: '10px', fontSize: `${40 * scaleFactor}px`, zIndex: 2 }}>Trials: {trialCount}</div>
    </div>
  );
};

export default Level1;
