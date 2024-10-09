import React, { useState } from "react";
import Dice from "./Dice";

const DiceRoller: React.FC = () => {
  const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5, 6]);

  const rollDice = () => {
    const newDiceValues: number[] = [];
    for (let i = 0; i < 6; i++) {
      newDiceValues.push(Math.floor(Math.random() * 6) + 1);
    }
    setDiceValues(newDiceValues);
  };

  return (
    <div>
      {diceValues.map((value, index) => (
        <Dice key={index} value={value} onClick={rollDice} />
      ))}
    </div>
  );
};

export default DiceRoller;
