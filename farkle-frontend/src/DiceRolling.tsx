import React from "react";

interface Die {
  value: number;
  held: boolean;
  index: number;
}

interface DiceRollingProps {
  dice: Die[];
  isRolling: boolean;
  onRoll: () => void;
  onHold: (index: number) => void;
}

const DiceRolling: React.FC<DiceRollingProps> = ({
  dice,
  isRolling,
  onRoll,
  onHold,
}) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <div>
        {dice.map((die) => (
          <div
            key={die.index}
            onClick={() => onHold(die.index)}
            style={{
              display: "inline-block",
              width: "50px",
              height: "50px",
              border: "1px solid black",
              margin: "5px",
              lineHeight: "50px",
              fontSize: "24px",
              backgroundColor: die.held ? "lightgreen" : "white",
              cursor: "pointer",
            }}
          >
            {die.value}
          </div>
        ))}
      </div>
      <button onClick={onRoll} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
};

export default DiceRolling;
