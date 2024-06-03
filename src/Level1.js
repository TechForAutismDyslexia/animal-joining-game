// import React, { useEffect, useRef, useState } from 'react';

// const Level1 = ({ onNext, onPrev }) => {
//   const pixiContainer = useRef(null);
//   const [trialCount, setTrialCount] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [timeTaken, setTimeTaken] = useState(null);

//   useEffect(() => {
//     if (!window.PIXI || !window.confetti) {
//       console.error('PIXI or confetti not loaded');
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
//       .add('image1', 'images/hippo-split (1).png')
//       .add('image2', 'images/hippo-split.png')
//       .add('shad', 'images/hippo-splitshad.png')
//       .load(setup);

//     let image1, image2, shad;

//     function setup() {
//       image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
//       image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
//       shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);

//       image1.x = 843;
//       image1.y = 100;
//       image2.x = 50;
//       image2.y = 100;
//       shad.x = 500;
//       shad.y = 100;

//       image2.interactive = true;
//       image2
//         .on('mousedown', onDragStart)
//         .on('mousemove', onDragMove)
//         .on('mouseup', onDragEnd)
//         .on('mouseupoutside', onDragEnd);

//       app.stage.addChild(shad);
//       app.stage.addChild(image1);
//       app.stage.addChild(image2);
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

//       if (Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 100) < 10) {
//         image2.x = 500;
//         image2.y = 100;

//         // Calculate the time taken to complete the level
//         const endTime = performance.now();
//         const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
//         setTimeTaken(duration);

//         window.confetti();
//       }
//     }

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

// export default Level1;

import React, { useEffect, useRef, useState } from 'react';

const Level1 = ({ onNext, onPrev }) => {
  const pixiContainer = useRef(null);
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (!window.PIXI || !window.confetti) {
      console.error('PIXI or confetti not loaded');
      return;
    }

    // Record the start time when the component mounts
    setStartTime(performance.now());

    const app = new window.PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0xD8F7F2,
    });

    if (pixiContainer.current) {
      pixiContainer.current.appendChild(app.view);
    }

    app.loader
      .add('image1', 'images/hippo-split (1).png')
      .add('image2', 'images/hippo-split.png')
      .add('shad', 'images/hippo-splitshad.png')
      .load(setup);

    let image1, image2, shad;

    function setup() {
      image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
      image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
      shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);

      // Adjust positions based on screen size
      image1.x = app.screen.width * 0.47;
      image1.y = app.screen.height * 0.2;
      image2.x = app.screen.width * 0.03;
      image2.y = app.screen.height * 0.2;
      shad.x = app.screen.width * 0.27;
      shad.y = app.screen.height * 0.2;

      image2.interactive = true;
      image2
        .on('pointerdown', onDragStart)
        .on('pointermove', onDragMove)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd);

      app.stage.addChild(shad);
      app.stage.addChild(image1);
      app.stage.addChild(image2);
    }

    function onDragStart(event) {
      this.data = event.data;
      this.dragging = true;
    }

    function onDragMove() {
      if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
      }
    }

    function onDragEnd() {
      setTrialCount(prevCount => prevCount + 1); // Increment trial count
      this.dragging = false;
      this.data = null;

      const targetX = app.screen.width * 0.27;
      const targetY = app.screen.height * 0.2;

      if (Math.abs(image2.x - targetX) < 10 && Math.abs(image2.y - targetY) < 10) {
        image2.x = targetX;
        image2.y = targetY;

        // Calculate the time taken to complete the level
        const endTime = performance.now();
        const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
        setTimeTaken(duration);

        window.confetti();
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, [onNext]);

  return (
    <div>
      <div ref={pixiContainer}></div>
      <div>Trials: {trialCount}</div> {/* Display the trial count */}
      {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>} {/* Display the time taken */}
    </div>
  );
};

export default Level1;

