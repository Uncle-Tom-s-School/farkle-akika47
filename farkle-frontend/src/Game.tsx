import React, { useState } from "react";
import DiceRoller from "./DiceRoller";
import Scorekeeper from "./Scorekeeper";

interface GameState {
  score: number;
}

const Game: React.FC = () => {
  const [score, setScore] = useState(0);

  const updateScore = (points: number) => {
    setScore(score + points);
  };

  return (
    <div>
      <DiceRoller />
      <Scorekeeper score={score} updateScore={updateScore} />
    </div>
  );
};

export default Game;
