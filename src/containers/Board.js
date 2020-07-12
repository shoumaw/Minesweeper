/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {StyleSheet, View, Alert, Button} from 'react-native';
import Constants from '../utils/AppConstants';
import Cell from '../components/Cell';
import Modal from '../components/Modal'
export default Board = () => {
  const [isGameOver, setIsGameOver] = useState(false)
  // on mount initialize the board
  const boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
  const grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map(
    (el, idx) => {
      return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, idx) => {
        return null;
      });
    },
  );
  const onStung = () => {
    setIsGameOver(true)
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        grid[i][j].current.uncoverWithoutSideEffects();
      }
    }
  };

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

  const onUncover = (x, y) => {
    let urchinsAround = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          x + i >= 0 &&
          x + i <= Constants.BOARD_SIZE - 1 &&
          y + j >= 0 &&
          y + j <= Constants.BOARD_SIZE - 1
        ) {
          if (grid[x + i][y + j].current.getUrchinsAround()) {
            urchinsAround++;
          }
        }
      }
    }

    if (urchinsAround) {
      grid[x][y].current.setUrchinsAround(urchinsAround)
    } else {
      uncoverNeighbors(x, y);
    }
  };

  const renderBoard = () => {
    return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, rowIdx) => {
        let cellList = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, colIdx) => {
          grid[colIdx][rowIdx] = useRef()
            return <Cell
                onUncover={onUncover}
                onStung={onStung}
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

  const resetGame = () => {
    setIsGameOver(false)
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        grid[i][j].current.reset();
      }
    }
  };

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
      <Modal isGameOver={isGameOver} resetGame={resetGame}/>
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
