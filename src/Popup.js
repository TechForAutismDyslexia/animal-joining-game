// import React, { useState } from 'react';

// const Popup = ({ onClose }) => {
//   const [audio] = useState(new Audio('path/to/audiofile.mp3'));

//   const handleClose = () => {
//     audio.pause();
//     onClose();
//   };

//   const handlePlay = () => {
//     audio.play();
//   };

//   return (
//     <div className="popup">
//       <h2>Popup Title</h2>
//       <p>Popup content goes here...</p>
//       <button onClick={handlePlay}>Play Audio</button>
//       <button onClick={handleClose}>Close Popup</button>
//     </div>
//   );
// };

// export default Popup;

// Popup.js
import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Welcome!</h2>
        <p>This is the popup content.</p>
        <button onClick={onClose}>Start</button>
      </div>
    </div>
  );
};

export default Popup;
