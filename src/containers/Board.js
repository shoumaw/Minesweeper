/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {StyleSheet, View, Alert, Button} from 'react-native';
import Constants from '../utils/AppConstants';
import Cell from '../components/Cell';
import Modal from '../components/Modal'
// The design used in this implementation is that the board has a reference to each cell and would invoke functions on them
// Using refs is advised in react as it goes against react flow from parent to child and using callbacks.
// But it seemed like a suitable solution for this kind of game
export default Board = () => {
  const [isGameOver, setIsGameOver] = useState(false)
  let totalNumUrchins = 0
  let totalNumUncovered = 0
  // on mount initialize the board
  const boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
  let gameOverText = Constants.YOU_LOSE
  // Initalize the board 
  const grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map(
    (el, idx) => {
      return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, idx) => {
        return null;
      });
    },
  );
  // If game over uncover all cells and show pop up
  const onGameOver= (text) => {
    setIsGameOver(true)
    gameOverText = text
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        grid[i][j].current.uncoverWithoutSideEffects();
      }
    }
  };
  // uncover neighbor cells if there are no urchins
  const uncoverNeighbors = (x, y) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          (i != 0 || j != 0) &&
          x + i >= 0 &&
          x + i <= Constants.BOARD_SIZE - 1 &&
          y + j >= 0 &&
          y + j <= Constants.BOARD_SIZE - 1
        ) {
          grid[x + i][y + j].current.onUncover(false);
        }
      }
    }
  };
  // onUncover calculate number of neighbours with urchins and decide if this gameplay is a winning play
  const onUncover = (x, y) => {
    let urchinsAround = 0;
    totalNumUncovered++
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          x + i >= 0 &&
          x + i <= Constants.BOARD_SIZE - 1 &&
          y + j >= 0 &&
          y + j <= Constants.BOARD_SIZE - 1
        ) {
          if (grid[x + i][y + j].current.isUrchin()) {
            urchinsAround++;
          }
        }
      }
    }
    if((grid.length * grid[0].length) - totalNumUncovered === totalNumUrchins){
      onGameOver(Constants.YOU_WIN)
    }
    else if (urchinsAround) {
      grid[x][y].current.setUrchinsAround(urchinsAround)
    } else {
      uncoverNeighbors(x, y);
    }
  };
  // reset game state and reset each cell
  const resetGame = () => {
    setIsGameOver(false)
    totalNumUncovered = 0
    totalNumUncovered = 0
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        grid[i][j].current.reset();
      }
    }
  };

  const renderBoard = () => {
    return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, rowIdx) => {
        let cellList = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, colIdx) => {
          grid[colIdx][rowIdx] = useRef()
            return <Cell
                onUncover={onUncover}
                onGameOver={onGameOver}
                setTotalNumUrchins={() => totalNumUrchins++}
                key={colIdx}
                width={Constants.CELL_SIZE}
                height={Constants.CELL_SIZE}
                x={colIdx}
                y={rowIdx}
                ref={grid[colIdx][rowIdx]}
            />
        });
        return (
            <View key={rowIdx} style={{ width: boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row'}}>
                {cellList}
            </View>
        )
    });


}



  return (
    <View style={styles.container}>
      <View
        style={{
          width: boardWidth,
          height: boardWidth,
          backgroundColor: '#888888',
          flexDirection: 'column',
        }}>
        {renderBoard()}
      </View>
      <Modal isGameOver={isGameOver} gameOverText={gameOverText} resetGame={resetGame}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
  },
});
