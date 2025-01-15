import React from 'react';

const GameScreen = () => {
  return (
    <div>
      <h1>Game Screen</h1>
      {/* Canvas element for rendering graphics. */}
      <canvas id="gameCanvas" width="800" height="600">
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};

export default GameScreen;