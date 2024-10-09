import React from "react";

interface DiceProps {
  value: number;
  onClick: () => void;
}

const Dice: React.FC<DiceProps> = ({ value, onClick }) => {
  return (
    <div onClick={onClick}>
      <p>{value}</p>
    </div>
  );
};

export default Dice;
