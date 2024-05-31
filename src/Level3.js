import React, { useEffect, useRef } from 'react';

const Level3 = ({ onNext, onPrev }) => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    if (!window.PIXI || !window.confetti || !window.TWEEN) {
      console.error('PIXI, confetti, or TWEEN not loaded');
      return;
    }

    const app = new window.PIXI.Application({
      width: 1800,
      height: 600,
      backgroundColor: 0xD8F7F2,
    });

    if (pixiContainer.current) {
      pixiContainer.current.appendChild(app.view);
    }

    app.loader
                .add('image1', 'images/tiger-split (1).png')
                .add('image2', 'images/tiger-split.png')
                .add('shad', 'images/tigershad.png')
                .add('deer', 'images/cheetahhead.png')
                .load(setup);

            // Variables to store the images
            var image1, image2,shad,deer;
            const originalDeerPosition = { x: 1200, y: 0 };


            function setup() {
                // Create sprites from the loaded images
                image1 = new window.PIXI.Sprite(app.loader.resources['image1'].texture);
                image2 = new window.PIXI.Sprite(app.loader.resources['image2'].texture);
                shad = new window.PIXI.Sprite(app.loader.resources['shad'].texture);
                deer = new window.PIXI.Sprite(app.loader.resources['deer'].texture);

                // Set initial positions
                image1.x = 734;
                image1.y = 100;
                image2.x = 1175;
                image2.y = 230;
                shad.x = 500;
                shad.y = 100;
                deer.x = originalDeerPosition.x;
                deer.y = originalDeerPosition.y;

                // Enable interactivity
                image2.interactive = true;
                deer.interactive = true;

                // Set up events for dragging
                image2
                    .on('mousedown', onDragStart)
                    .on('mousemove', onDragMove)
                    .on('mouseup', onDragEnd)
                    .on('mouseupoutside', onDragEnd);
                
                deer
                    .on('mousedown', onDragStart)
                    .on('mousemove', onDragMove)
                    .on('mouseup', onDragEnd)
                    .on('mouseupoutside', onDragEnd);
                // Add images to the stage
                app.stage.addChild(shad);
                app.stage.addChild(image1);
                app.stage.addChild(image2);
                app.stage.addChild(deer);
                
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
                this.dragging = false;
                this.data = null;

                if (this === deer) {
                    shakeAndResetDeer();
                }
                if(Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 100) < 10){
                    image2.x = 500;
                    image2.y = 100
                }

                // Check if images are in a specific position
                if (Math.abs(image2.x - 500) < 10 && Math.abs(image2.y - 100) < 10 ) {
                    // Trigger confetti effect
                    window.confetti();
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

    function animate(time) {
      requestAnimationFrame(animate);
      window.TWEEN.update(time);
    }
    requestAnimationFrame(animate);

    return () => {
      app.destroy(true, true);
    };
  }, [onNext]);

  return <div ref={pixiContainer}></div>;
};

export default Level3;
