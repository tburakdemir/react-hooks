// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, onClick, ...props}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [
    Array(9).fill(''),
  ])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)

  const nextValue = calculateNextValue(history[currentStep])
  const winner = calculateWinner(history[currentStep])
  const status = calculateStatus(winner, history[currentStep], nextValue)

  const selectSquare = square => {
    if (winner) return
    if (history[currentStep][square]) return

    var tempHistory = history.slice(0, currentStep + 1)
    var lastMove = [...history[currentStep]]
    lastMove[square] = nextValue
    setHistory([...tempHistory, lastMove])
    setCurrentStep(tempHistory.length)
  }
  function restart() {
    setHistory([Array(9).fill('')])
    setCurrentStep(0)
  }

  const handleMoveButton = index => {
    console.log('move to' + index)
    setCurrentStep(index)
  }

  const moves = history.map((move, index) => {
    return (
      <li key={index}>
        <button
          disabled={index === currentStep}
          onClick={() => handleMoveButton(index)}
        >
          Go to #{index}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={history[currentStep]} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">STATUS {status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  console.log(squares)
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
