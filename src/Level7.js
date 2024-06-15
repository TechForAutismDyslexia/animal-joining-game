// import React, { useEffect, useRef, useState } from 'react';

// const Level4 = ({ onNext, onPrev }) => {
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
//                 .add('image1', 'images/l1.png')
//                 .add('image2', 'images/l2.png')
//                 .add('image3', 'images/l3.png')
//                 .add('image4', 'images/l4.png')
//                 .add('shad', 'images/lionshadow1.png')
//                 .load(setup);

//             // Variables to store the images
//             var image1, image2 , image3 , image4 , shad;

//             function setup() {
//                 // Create sprites from the loaded images
//                 image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
//                 image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
//                 image3 = new window.PIXI.Sprite(app.loader.resources['image3'].texture);
//                 image4 = new window.PIXI.Sprite(app.loader.resources['image4'].texture);
//                 shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);

//                 // Set initial positions
//                 image1.x = 1;
//                 image1.y = 100;
//                 image2.x = 1;
//                 image2.y = 500;
//                 image3.x = 1000;
//                 image3.y = 500;
//                 image4.x = 1000;
//                 image4.y = 100;
//                 shad.x = 500;
//                 shad.y = 100;

//                 // image1.x = 500;
//                 // image1.y = 100;
//                 // image2.x = 500;
//                 // image2.y = 184;
//                 // image3.x = 500;
//                 // image3.y = 267;
//                 // image4.x = 500;
//                 // image4.y = 350;
//                 // shad.x = 500;
//                 // shad.y = 100;

//                 // Enable interactivity
//                 image1.interactive = true;
//                 image2.interactive = true;
//                 image3.interactive = true;
//                 image4.interactive = true;

//                 // Set up events for dragging
//                 image1
//                     .on('mousedown', onDragStart)
//                     .on('mousemove', onDragMove)
//                     .on('mouseup', onDragEnd)
//                     .on('mouseupoutside', onDragEnd);

//                 image2
//                     .on('mousedown', onDragStart)
//                     .on('mousemove', onDragMove)
//                     .on('mouseup', onDragEnd)
//                     .on('mouseupoutside', onDragEnd);
                
//                 image3
//                     .on('mousedown', onDragStart)
//                     .on('mousemove', onDragMove)
//                     .on('mouseup', onDragEnd)
//                     .on('mouseupoutside', onDragEnd);
                
//                 image4
//                     .on('mousedown', onDragStart)
//                     .on('mousemove', onDragMove)
//                     .on('mouseup', onDragEnd)
//                     .on('mouseupoutside', onDragEnd);
//                 // Add images to the stage
//                 app.stage.addChild(shad);
//                 app.stage.addChild(image1);
//                 app.stage.addChild(image2);
//                 app.stage.addChild(image3);
//                 app.stage.addChild(image4);
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
//                 setTrialCount(prevCount => prevCount + 1); // Increment trial count
//                 this.dragging = false;
//                 this.data = null;

//                 if(Math.abs(image1.x - 500) < 10 && Math.abs(image1.y - 100) < 10){
//                     image1.x=500;
//                     image1.y=100
//                 }
//                 if(Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 184) < 10){
//                     image2.x=500;
//                     image2.y=184
//                 }if(Math.abs(image3.x - 500) < 10 && Math.abs(image3.y - 267) < 10){
//                     image3.x=500;
//                     image3.y=267
//                 }if(Math.abs(image4.x - 500) < 10 && Math.abs(image4.y - 350) < 10){
//                     image4.x=500;
//                     image4.y=350
//                 }
//                 // Check if images are in a specific position
//                 if (Math.abs(image1.x - 500) < 5 && Math.abs(image1.y - 100) < 5 && Math.abs(image2.x - 500) < 5 && Math.abs(image2.y - 184) < 5 && Math.abs(image3.x - 500) < 5 && Math.abs(image3.y - 267) < 5 && Math.abs(image4.x - 500) < 5 && Math.abs(image4.y - 350) < 5) {
//                     // Calculate the time taken to complete the level
//         const endTime = performance.now();
//         const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
//         setTimeTaken(duration);
//                     // Trigger confetti effect
//                     window.confetti();
                   
//                 }
//             }

//     // function shakeAndResetDeer() {
//     //   const shakeAmplitude = 10;
//     //   const shakeDuration = 100;

//     //   const shake = new window.TWEEN.Tween(deer.position)
//     //     .to({ x: deer.x + shakeAmplitude }, shakeDuration)
//     //     .yoyo(true)
//     //     .repeat(5)
//     //     .onComplete(() => {
//     //       new window.TWEEN.Tween(deer.position)
//     //         .to({ x: originalDeerPosition.x, y: originalDeerPosition.y }, 500)
//     //         .start();
//     //     })
//     //     .start();
//     // }

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

// export default Level4;
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
