import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

import "../App.css";
import InstructionsPopup from "./InstructionsPopup";
import audio from "../assets/images/audio.png";
import gob from "../assets/images/goback.webp";
import last from "../assets/images/last.gif";
import inst from "../assets/inst.mp3";
import instructions from "../assets/instructions.mp3";

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(-1); // -1 indicates the start page
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [levels, setLevels] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false); // State to control showing InstructionsPopup
  const audioRef = useRef(null);
  const instructionsAudioRef = useRef(new Audio(instructions));
  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    if (startTime !== 0 && currentLevel >= levels.length) {
      setEndTime(Date.now()); // Record end time when all levels are completed
    }
  }, [currentLevel, startTime, levels.length]);

  useEffect(() => {
    if (currentLevel === -1) {
      localStorage.removeItem("totalTrialCount"); // Reset trial count at the beginning of a new session
    }
  }, [currentLevel]);

  useEffect(() => {
    const sendGameData = async () => {
      try {
        const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
        const totalTrialCount = localStorage.getItem("totalTrialCount") || 0;
        const gameId = "105";

        const gameData = {
          gameId,
          tries: totalTrialCount,
          timer: totalTimeInSeconds,
          status: true
        };

        console.log("Sending game data:", gameData);

        const response = await fetch(
          "https://jwlgamesbackend.vercel.app/api/caretaker/sendgamedata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(gameData)
          }
        );

        if (response.ok) {
          console.log("Game data saved successfully");
        } else {
          console.error("Failed to save game data", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call sendGameData only once when game ends
    if (currentLevel >= levels.length && startTime !== 0 && endTime !== 0) {
      sendGameData();
    }
  }, [currentLevel, startTime, endTime, levels.length]);

  const nextLevel = () => {
    setCurrentLevel((prevLevel) => Math.min(prevLevel + 1, levels.length));
  };

  const prevLevel = () => {
    setCurrentLevel((prevLevel) => Math.max(prevLevel - 1, 0));
  };

  const replayGame = () => {
    setCurrentLevel(-1);
    setStartTime(0);
    setEndTime(0);
    setSelectedSession(null);
    setShowInstructions(false);
  };

  const renderLevel = () => {
    if (currentLevel === -1) {
      return (
        <div className="start-page">
          <div className="goback">
            <img
              src={gob}
              alt="goback"
              onClick={() => {
                window.location.href = "https://joywithlearning.com/games";
              }}
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
            />
          </div>
          <h3 className="heading">Animal Matching Game</h3>
          <button className="button-74" onClick={() => handleSessionSelect("session1")}>
            Session 1
          </button>
          <button className="button-74" onClick={() => handleSessionSelect("session2")}>
            Session 2
          </button>
          <button className="button-74" onClick={() => handleSessionSelect("session3")}>
            Session 3
          </button>
        </div>
      );
    } else if (currentLevel < levels.length) {
      const LevelComponent = React.lazy(() => import(`./${levels[currentLevel]}.jsx`));
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LevelComponent
            onNext={nextLevel}
            onPrev={prevLevel}
            onLevelComplete={handleLevelComplete}
            updateTrialCount={updateTrialCount}
            throwConfetti={throwConfetti}
          />
        </React.Suspense>
      );
    } else {
      const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
      const totalTrialCount = localStorage.getItem("totalTrialCount") || 0;
      const gameId = "105";

      return (
        <div className="end-page">
          <h3 className="heading" style={{ fontSize: "50px" }}>
            Good Job!
          </h3>
          <img src={last} style={{ width: "200px", height: "auto" }} alt="Congratulations GIF" />
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            Total Time: {formatTime(totalTimeInSeconds)}
          </p>
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>Total Trials: {totalTrialCount}</p>

          <button className="button-74" onClick={replayGame}>
            Replay
          </button>
          <div className="goback">
            <img
              src={gob}
              alt="goback"
              onClick={() => {
                window.location.href = "https://joywithlearning.com/games";
              }}
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
            />
          </div>
        </div>
      );
    }
  };

  const handleLevelComplete = () => {
    // No need to check currentLevel === totalLevels - 1, since we increment past the last level
  };

  const toggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    }
  };

  const handleSessionSelect = async (session) => {
    setSelectedSession(session);
    playInstructionsAudio(); // Play instructions audio when session is selected
    const sessionLevels = {
      session1: ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6"],
      session2: ["Level7", "Level8", "Level9", "Level10", "Level11", "Level12"],
      session3: ["Level13", "Level14", "Level15", "Level16", "Level17", "Level18"]
    };
    setLevels(sessionLevels[session]);
    setShowInstructions(true);
  };

  const playInstructionsAudio = () => {
    if (instructionsAudioRef.current.paused) {
      instructionsAudioRef.current.play();
    }
  };

  const handleCloseInstructions = () => {
    setCurrentLevel(0);
    setStartTime(Date.now()); // Start the timer
    setShowInstructions(false);
  };

  const updateTrialCount = (levelTrialCount) => {
    const totalTrialCount = parseInt(localStorage.getItem("totalTrialCount") || 0, 10);
    localStorage.setItem("totalTrialCount", totalTrialCount + levelTrialCount);
  };

  return (
    <div className="app-container">
      <div className="audio-player">
        <audio ref={audioRef} src={inst} />
        <img
          src={audio}
          alt="Play"
          className="play-icon"
          onClick={toggleAudio}
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
      </div>

      {currentLevel >= 0 && currentLevel < levels.length && (
        <div className="button-container">
          <button className="button-74" onClick={prevLevel} disabled={currentLevel <= 0}>
            Previous
          </button>
          <button
            className="button-74"
            onClick={nextLevel}
            disabled={currentLevel === levels.length}
          >
            Next
          </button>
        </div>
      )}

      <div className="level-container">{renderLevel()}</div>

      {showInstructions && <InstructionsPopup onClose={handleCloseInstructions} />}
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

export default Game;
