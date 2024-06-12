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

// export default Level2;
import React, { useEffect, useRef, useState } from 'react';

const Level2 = ({ onNext, onPrev }) => {
  const pixiContainer = useRef(null);
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (!window.PIXI || !window.confetti || !window.TWEEN) {
      console.error('PIXI, confetti, or TWEEN not loaded');
      return;
    }

    const app = new window.PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xD8F7F2,
      resizeTo: pixiContainer.current,
    });

    if (pixiContainer.current) {
      pixiContainer.current.appendChild(app.view);
    }

    setStartTime(performance.now());
    setTimeTaken(null);
    setTrialCount(0);

    app.loader
      .add('image1', 'images/head.png')
      .add('image2', 'images/tail.png')
      .add('shad', 'images/headshad.png')
      .add('deer', 'images/deerhead.png')
      .load(setup);

    let image1, image2, shad, deer;
    const originalDeerPosition = { x: 1200, y: 0 };

    function setup() {
      image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
      image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
      shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);
      deer = new window.PIXI.Sprite(app.loader.resources['deer'].texture);

      image1.x = 1200;
      image1.y = 280;
      image2.x = 500;
      image2.y = 100;
      shad.x = 700;
      shad.y = 100;
      deer.x = originalDeerPosition.x;
      deer.y = originalDeerPosition.y;

      image1.interactive = true;
      deer.interactive = true;
      image1.buttonMode = true;
      deer.buttonMode = true;

      image1
        .on('pointerdown', onDragStart)
        .on('pointermove', onDragMove)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd);

      deer
        .on('pointerdown', onDragStart)
        .on('pointermove', onDragMove)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd);

      app.stage.addChild(shad);
      app.stage.addChild(image1);
      app.stage.addChild(image2);
      app.stage.addChild(deer);
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
      setTrialCount(prevCount => prevCount + 1);
      this.dragging = false;
      this.data = null;

      if (this === deer) {
        shakeAndResetDeer();
      } else {
        if (Math.abs(image1.x - 700) < 10 && Math.abs(image1.y - 100) < 10) {
          image1.x = 700;
          image1.y = 100;
        }

        if (
          Math.abs(image1.x - 700) < 10 &&
          Math.abs(image1.y - 100) < 10 &&
          Math.abs(image2.x - 500) < 10 &&
          Math.abs(image2.y - 100) < 10
        ) {
          const endTime = performance.now();
          const duration = Math.round((endTime - startTime) / 1000);
          setTimeTaken(duration);
          window.confetti();
        }
      }
    }

    function shakeAndResetDeer() {
      const shakeAmplitude = 10;
      const shakeDuration = 100;

      const shake = new window.TWEEN.Tween(deer.position)
        .to({ x: deer.x + shakeAmplitude }, shakeDuration)
        .yoyo(true)
        .repeat(5)
        .onComplete(() => {
          new window.TWEEN.Tween(deer.position)
            .to({ x: originalDeerPosition.x, y: originalDeerPosition.y }, 500)
            .start();
        })
        .start();
    }

    app.ticker.add(() => {
      window.TWEEN.update();
    });

    return () => {
      app.destroy(true, true);
    };
  }, [onNext]);

  return (
    <div>
      <div ref={pixiContainer} style={{ width: '100%', height: '100vh' }}></div>
      <div>Trials: {trialCount}</div>
      {timeTaken !== null && <div>Time Taken: {timeTaken} seconds</div>}
    </div>
  );
};

export default Level2;
