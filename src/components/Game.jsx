import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

import "../App.css";
import InstructionsPopup from "./InstructionsPopup";
import audio from "../assets/images/audio.png";
import gob from "../assets/images/goback.webp";
import congratsGIF from "../assets/images/last.gif";
import inst from "../assets/inst.mp3";
import instructions from "../assets/instructions.mp3";
import Level from "./Level";

// Create audio instances outside component to prevent multiple instantiation
const instructionsAudioInstance = new Audio(instructions);
const instAudioInstance = new Audio(inst);

const Game = () => {
  const [level, setLevel] = useState(-1); // -1 indicates the start page
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [session, setSession] = useState(-1);
  const [showInstructions, setShowInstructions] = useState(false); // State to control showing InstructionsPopup
  const [audioInitialized, setAudioInitialized] = useState(false);

  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    if (startTime !== 0 && session >= 0 && level >= 6) {
      setEndTime(Date.now()); // Record end time when all levels are completed
    }
  }, [level, startTime, session]);

  useEffect(() => {
    if (level === -1) {
      localStorage.removeItem("totalTrialCount"); // Reset trial count at the beginning of a new session
    }
  }, [level]);

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
    if (level >= 6 && startTime !== 0 && endTime !== 0) {
      sendGameData();
    }
  }, [level, startTime, endTime, session]);

  // Initialize audio only once
  useEffect(() => {
    if (!audioInitialized) {
      instructionsAudioInstance.load();
      instAudioInstance.load();
      setAudioInitialized(true);
    }
  }, [audioInitialized]);

  const nextLevel = () => {
    setLevel((prevLevel) => Math.min(prevLevel + 1, 6));
  };

  const prevLevel = () => {
    setLevel((prevLevel) => Math.max(prevLevel - 1, 0));
  };

  const replayGame = () => {
    setLevel(0);
    setStartTime(0);
    setEndTime(0);
    setShowInstructions(false);
  };

  const renderLevel = () => {
    if (level === -1) {
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
          {[1, 2, 3].map((session) => (
            <button
              className="button-74"
              onClick={() => handleSessionSelect(session)}
              key={session}
            >
              Session {session}
            </button>
          ))}
        </div>
      );
    } else if (0 <= level && level <= 5) {
      console.log("Level", level);
      return (
        <Level
          sessionId={session}
          levelId={level + 1}
          updateTrialCount={updateTrialCount}
          throwConfetti={throwConfetti}
        />
      );
    } else if (level > 5) {
      const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
      const totalTrialCount = localStorage.getItem("totalTrialCount") || 0;

      return (
        <div className="end-page">
          <h3 className="heading" style={{ fontSize: "50px" }}>
            Good Job! <br />
            Session {session} Completed
          </h3>
          <img
            src={congratsGIF}
            style={{ width: "200px", height: "auto" }}
            alt="Congratulations GIF"
          />
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            Total Time: {formatTime(totalTimeInSeconds)}
          </p>
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>Total Trials: {totalTrialCount}</p>

          <button className="button-74" onClick={replayGame}>
            Replay
          </button>
          {session <= 2 && (
            <button className="button-74" onClick={() => handleSessionSelect(session + 1, false)}>
              Next Session
            </button>
          )}
          <div className="goback">
            <img
              src={gob}
              alt="goback"
              onClick={() => {
                window.location.reload();
              }}
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
            />
          </div>
        </div>
      );
    }
  };

  const playInstructions = () => {
    if (instAudioInstance.paused) {
      instAudioInstance.play();
    }
  };

  const handleSessionSelect = async (s, i = true) => {
    playInstructionsAudio(); // Play instructions audio when session is selected
    setSession(s);
    setStartTime(0);
    setEndTime(0);
    setShowInstructions(i);
    if (!i) setLevel(0);
  };

  const playInstructionsAudio = () => {
    if (instructionsAudioInstance.paused) {
      instructionsAudioInstance.play();
    }
  };

  const handleCloseInstructions = () => {
    setLevel(0);
    setStartTime(Date.now()); // Start the timer
    setShowInstructions(false);
  };

  const updateTrialCount = (levelTrialCount) => {
    const totalTrialCount = parseInt(localStorage.getItem("totalTrialCount") || 0, 10);
    localStorage.setItem("totalTrialCount", totalTrialCount + levelTrialCount);
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      instructionsAudioInstance.pause();
      instAudioInstance.pause();
      instructionsAudioInstance.currentTime = 0;
      instAudioInstance.currentTime = 0;
    };
  }, []);

  return (
    <div className="app-container">
      <div className="audio-player">
        <img
          src={audio}
          alt="Play"
          className="play-icon"
          onClick={playInstructions}
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
      </div>

      {level >= 0 && level <= 5 && session >= 0 && (
        <div className="button-container">
          <button
            className="button-74"
            style={{ opacity: level <= 0 ? 0.4 : 1 }}
            onClick={prevLevel}
            disabled={level <= 0}
          >
            Previous
          </button>
          <button
            className="button-74"
            style={{ opacity: level >= 6 ? 0.4 : 1 }}
            onClick={nextLevel}
            disabled={level >= 6}
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
