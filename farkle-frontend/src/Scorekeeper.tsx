import React, { useState } from "react";

interface ScorekeeperProps {
  score: number;
  updateScore: (points: number) => void;
}

const Scorekeeper: React.FC<ScorekeeperProps> = ({ score, updateScore }) => {
  return (
    <div>
      <p>Score: {score}</p>
    </div>
  );
};

export default Scorekeeper;
