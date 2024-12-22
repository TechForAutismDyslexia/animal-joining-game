import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const Level = ({ sessionId, levelId, onNext, onPrev, updateTrialCount, throwConfetti }) => {
  const [levelData, setLevelData] = useState(null);
  const [imageMap, setImageMap] = useState({});
  const [trials, setTrials] = useState(0);
  const [scale, setScale] = useState(1);
  const [positions, setPositions] = useState({});
  const dragRefs = useRef({});
  const [isComplete, setIsComplete] = useState(false);
  const [correctMatch, setCorrectMatch] = useState(false);

  useEffect(() => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    setScale(scale);

    // Update positions when scale changes
    if (levelData) {
      const newPositions = {};
      levelData.segments.forEach((segment) => {
        newPositions[segment.id] = {
          x: segment.x * scale,
          y: segment.y * scale
        };
      });
      setPositions(newPositions);
    }
  }, [levelData]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataModule = await import(`../assets/session${sessionId}/level${levelId}.json`);
        const data = dataModule.default;

        const tempImageMap = {};
        for (const segment of data.segments) {
          tempImageMap[segment.id] = (await import(`../${segment.src}`)).default;
          dragRefs.current[segment.id] = React.createRef();
        }

        setImageMap(tempImageMap);
        setLevelData(data);
      } catch (error) {
        console.error("Error loading level data:", error);
      }
    };
    loadData();
  }, [sessionId, levelId]);

  // Reset game status on level change
  useEffect(() => {
    setTrials(0);
    setCorrectMatch(false);
    setIsComplete(false);
    // Reset positions to initial state based on current scale
    if (levelData) {
      const newPositions = {};
      levelData.segments.forEach((segment) => {
        newPositions[segment.id] = {
          x: segment.x * scale,
          y: segment.y * scale
        };
      });
      setPositions(newPositions);
    }
  }, [levelId, scale, levelData]);

  const onStop = (segment, e, data) => {
    if (isComplete || correctMatch) {
      // If already complete, snap back to original position
      setPositions((prev) => ({
        ...prev,
        [segment.id]: positions[segment.id]
      }));
      return;
    }

    setTrials((prev) => prev + 1);
    const shadowSegment = levelData.segments.find((s) => s.type === "shadow");
    const shadowPos = positions[shadowSegment.id];

    if (
      segment.isCorrect &&
      Math.abs(data.x - shadowPos.x) < 50 * scale &&
      Math.abs(data.y - shadowPos.y) < 50 * scale
    ) {
      setPositions((prev) => ({
        ...prev,
        [segment.id]: shadowPos
      }));
      setCorrectMatch(true);
      setIsComplete(true);
      throwConfetti();
      updateTrialCount(trials + 1);
    } else {
      // Update position if not correct match
      setPositions((prev) => ({
        ...prev,
        [segment.id]: { x: data.x, y: data.y }
      }));
    }
  };

  if (!levelData) return <div>Loading...</div>;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#D8F7F2",
        height: "calc(100vh - 100px)",
        zIndex: 1
      }}
    >
      {levelData.segments.map((segment) => {
        const position = positions[segment.id] || { x: 0, y: 0 };

        if (segment.type === "segment") {
          return (
            <Draggable
              key={segment.id}
              position={position}
              onStop={(e, data) => onStop(segment, e, data)}
              nodeRef={dragRefs.current[segment.id]}
              disabled={correctMatch || isComplete} // Disable all segments after correct match
            >
              <div
                ref={dragRefs.current[segment.id]}
                className="images"
                style={{
                  position: "absolute",
                  width: `${segment.width * scale}px`,
                  height: `${segment.height * scale}px`,
                  backgroundImage: `url(${imageMap[segment.id]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  cursor: correctMatch || isComplete ? "default" : "move",
                  opacity: correctMatch && !segment.isCorrect ? 0.6 : 1,
                  filter: correctMatch && !segment.isCorrect ? "grayscale(50%)" : "none"
                }}
              />
            </Draggable>
          );
        }

        return (
          <div
            key={segment.id}
            className="images"
            style={{
              position: "absolute",
              width: `${segment.width * scale}px`,
              height: `${segment.height * scale}px`,
              backgroundImage: `url(${imageMap[segment.id]})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          top: `${150 * scale}px`,
          right: "10px",
          fontSize: `${50 * scale}px`,
          zIndex: 2
        }}
      >
        Trials: {trials}
      </div>
    </div>
  );
};

export default Level;
