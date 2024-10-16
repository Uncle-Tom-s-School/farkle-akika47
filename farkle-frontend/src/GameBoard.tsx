import React, { useState } from "react";
import DiceRolling from "./DiceRolling";
import "./GameBoard.css";

interface Die {
  value: number;
  held: boolean;
}

const GameBoard: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [runningTotal, setRunningTotal] = useState<number>(0);
  const [dice, setDice] = useState<Die[]>(generateDice());
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [canRoll, setCanRoll] = useState<boolean>(false); // Track if rolling is allowed

  function generateDice() {
    return Array.from({ length: 6 }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      held: false,
    }));
  }

  const rollDice = () => {
    if (!canRoll) {
      alert("You must hold at least one die worth points before rolling.");
      return;
    }

    setIsRolling(true);

    // Roll only the unheld dice
    const newDice = dice
      .filter((die) => !die.held)
      .map(() => ({
        value: Math.floor(Math.random() * 6) + 1,
        held: false,
      }));

    // Calculate score for currently held dice
    const heldDice = dice.filter((die) => die.held);
    const heldScore = calculateScore(heldDice);

    // Update running total with the held score
    setRunningTotal((prev) => prev + heldScore);

    // Check for Farkle
    const currentScore = calculateScore(newDice);
    if (currentScore === 0 && heldScore === 0) {
      alert(
        `Farkle! You rolled: ${newDice.map((die) => die.value).join(", ")}`
      );
      setRunningTotal(0);
      resetDice(); // Reset dice for the next turn
    } else {
      // Update dice state, Removing the Held Dice
      setDice([...newDice]);
      setCanRoll(false); // Reset canRoll for the next round
    }

    setIsRolling(false);
  };

  const holdDice = (index: number) => {
    const newDice = dice.map((die, i) =>
      i === index ? { ...die, held: !die.held } : die
    );
    setDice(newDice);

    // Check if at least one die worth points is held
    const heldScore = calculateScore(newDice.filter((die) => die.held));
    setCanRoll(heldScore > 0); // Update canRoll state
  };

  const endTurn = () => {
    if (runningTotal >= 500) {
      setScore((prev) => prev + runningTotal);
      setRunningTotal(0);
      resetDice(); // Reset dice for next turn
    } else {
      alert("You need at least 500 points to stop rolling.");
    }
  };

  const resetDice = () => {
    setDice(generateDice());
    setCanRoll(false); // Reset canRoll after resetting dice
  };

  const calculateScore = (rolledDice: Die[]): number => {
    const counts = Array(7).fill(0);
    let score = 0;

    // Count occurrences of each die value
    for (const die of rolledDice) {
      counts[die.value]++;
    }

    // Scoring for single 1s and 5s
    score += counts[1] * 100; // Each 1 is worth 100 points
    score += counts[5] * 50; // Each 5 is worth 50 points

    // Scoring for triples or more
    for (let i = 1; i <= 6; i++) {
      if (counts[i] >= 3) {
        // Check for triples
        if (i === 1) {
          score += 300; // Three 1s are worth 300 points
        } else {
          score += i * 100; // Three of any other number is worth 100 times the number
        }
        counts[i] -= 3; // Remove counted triples
      }
    }

    // Scoring for four, five, and six of a kind
    for (let i = 1; i <= 6; i++) {
      if (counts[i] === 4) {
        score += 1000; // Four of a kind
      } else if (counts[i] === 5) {
        score += 2000; // Five of a kind
      } else if (counts[i] === 6) {
        score += 3000; // Six of a kind
      }
    }

    // Check for special combinations
    const uniqueDice = rolledDice.map((die) => die.value);
    const uniqueCount = new Set(uniqueDice).size;

    if (uniqueCount === 6) {
      score += 1500; // 1-6 straight
    } else if (counts.filter((count) => count === 2).length === 3) {
      score += 1500; // Three pairs
    } else if (counts.filter((count) => count === 3).length === 2) {
      score += 2500; // Two triplets
    } else if (
      counts.filter((count) => count === 4).length === 1 &&
      counts.filter((count) => count === 2).length === 1
    ) {
      score += 1500; // Four of a kind with a pair
    }

    return score;
  };

  const checkForWin = () => {
    if (score >= 10000) {
      alert("You win!");
      setGameOver(true);
    }
  };

  return (
    <div className="game-board">
      <h1>Farkle Game</h1>
      <h2>Current Score: {score}</h2>
      <h2>Running Total: {runningTotal}</h2>
      {gameOver ? (
        <h2>Game Over!</h2>
      ) : (
        <>
          <DiceRolling
            dice={dice.map((die, index) => ({
              value: die.value,
              held: die.held,
              index,
            }))}
            isRolling={isRolling}
            onRoll={rollDice}
            onHold={holdDice}
          />
          <div className="buttons">
            <button className="button" onClick={endTurn}>
              End Turn
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GameBoard;
