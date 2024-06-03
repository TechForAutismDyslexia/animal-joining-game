import React, { useEffect, useRef, useState } from 'react';

const Level4 = ({ onNext, onPrev }) => {
  const pixiContainer = useRef(null);
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (!window.PIXI || !window.confetti || !window.TWEEN) {
      console.error('PIXI, confetti, or TWEEN not loaded');
      return;
    }

    // Record the start time when the component mounts
    setStartTime(performance.now());

    const app = new window.PIXI.Application({
      width: 1800,
      height: 600,
      backgroundColor: 0xD8F7F2,
    });

    if (pixiContainer.current) {
      pixiContainer.current.appendChild(app.view);
    }

    app.loader
                .add('image1', 'images/l1.png')
                .add('image2', 'images/l2.png')
                .add('image3', 'images/l3.png')
                .add('image4', 'images/l4.png')
                .add('shad', 'images/lionshadow1.png')
                .load(setup);

            // Variables to store the images
            var image1, image2 , image3 , image4 , shad;

            function setup() {
                // Create sprites from the loaded images
                image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
                image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
                image3 = new window.PIXI.Sprite(app.loader.resources['image3'].texture);
                image4 = new window.PIXI.Sprite(app.loader.resources['image4'].texture);
                shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);

                // Set initial positions
                image1.x = 1;
                image1.y = 100;
                image2.x = 1;
                image2.y = 500;
                image3.x = 1000;
                image3.y = 500;
                image4.x = 1000;
                image4.y = 100;
                shad.x = 500;
                shad.y = 100;

                // image1.x = 500;
                // image1.y = 100;
                // image2.x = 500;
                // image2.y = 184;
                // image3.x = 500;
                // image3.y = 267;
                // image4.x = 500;
                // image4.y = 350;
                // shad.x = 500;
                // shad.y = 100;

                // Enable interactivity
                image1.interactive = true;
                image2.interactive = true;
                image3.interactive = true;
                image4.interactive = true;

                // Set up events for dragging
                image1
                    .on('mousedown', onDragStart)
                    .on('mousemove', onDragMove)
                    .on('mouseup', onDragEnd)
                    .on('mouseupoutside', onDragEnd);

                image2
                    .on('mousedown', onDragStart)
                    .on('mousemove', onDragMove)
                    .on('mouseup', onDragEnd)
                    .on('mouseupoutside', onDragEnd);
                
                image3
                    .on('mousedown', onDragStart)
                    .on('mousemove', onDragMove)
                    .on('mouseup', onDragEnd)
                    .on('mouseupoutside', onDragEnd);
                
                image4
                    .on('mousedown', onDragStart)
                    .on('mousemove', onDragMove)
                    .on('mouseup', onDragEnd)
                    .on('mouseupoutside', onDragEnd);
                // Add images to the stage
                app.stage.addChild(shad);
                app.stage.addChild(image1);
                app.stage.addChild(image2);
                app.stage.addChild(image3);
                app.stage.addChild(image4);
            }

            // Drag functions
            function onDragStart(event) {
                this.data = event.data;
                this.dragging = true;
            }

            function onDragMove() {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.x = newPosition.x;
                    this.y = newPosition.y;
                }
            }

            function onDragEnd() {
                setTrialCount(prevCount => prevCount + 1); // Increment trial count
                this.dragging = false;
                this.data = null;

                if(Math.abs(image1.x - 500) < 10 && Math.abs(image1.y - 100) < 10){
                    image1.x=500;
                    image1.y=100
                }
                if(Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 184) < 10){
                    image2.x=500;
                    image2.y=184
                }if(Math.abs(image3.x - 500) < 10 && Math.abs(image3.y - 267) < 10){
                    image3.x=500;
                    image3.y=267
                }if(Math.abs(image4.x - 500) < 10 && Math.abs(image4.y - 350) < 10){
                    image4.x=500;
                    image4.y=350
                }
                // Check if images are in a specific position
                if (Math.abs(image1.x - 500) < 5 && Math.abs(image1.y - 100) < 5 && Math.abs(image2.x - 500) < 5 && Math.abs(image2.y - 184) < 5 && Math.abs(image3.x - 500) < 5 && Math.abs(image3.y - 267) < 5 && Math.abs(image4.x - 500) < 5 && Math.abs(image4.y - 350) < 5) {
                    // Calculate the time taken to complete the level
                const endTime = performance.now();
                const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds
                setTimeTaken(duration);
                    // Trigger confetti effect
                    window.confetti();
                   
                }
            }

    function animate(time) {
      requestAnimationFrame(animate);
      window.TWEEN.update(time);
    }
    requestAnimationFrame(animate);

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

export default Level4;