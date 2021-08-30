import {useState} from 'react';
import styled from 'styled-components';

export const Grid = styled.div`
    width: 600px;
    height: 600px;
    margin: 0 auto;
    background-color: ${({bgColor}) => bgColor};
    color: ${({color}) => color ? color : "#fff"};
    border: 6px solid ${({borderColor}) => borderColor};
    border-radius: 10px;

    display: grid;
    grid-template: ${({width, height}) => {
        return `repeat(${width}, 1fr) / repeat(${height}, 1fr)`
    }};
`

export const Cell = styled.div`
    border: 6px solid ${({borderColor}) => borderColor};
    font-family: Helvetica;
    font-weight: bold;
    color: ${({color}) => color ? color : "#fff"};
    font-size: ${({fontSize}) => fontSize ? fontSize : "4em"};
    background-color: ${({bgColor}) => bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const Center = styled.div`
    width: 100vw;
    text-align: center;
`;

function App() {
  let [board, setBoard] = useState(Array(9).fill(false));

  const indexToXY = (index) => [index % 3, Math.floor(index / 3)]

  const XYToIndex = (x, y) => {
    if (x > 2 || x < 0 || y > 2 || y < 0) return -1
    let index = y * 3 + x;

    if (index === 4)
      return -1;

    return index;
  }

  const getAdjacentCellIndices = (index) => {
    let [x, y] = indexToXY(index);
    // Left, Down, Right, Up
    let moves = [[-1,0], [0, 1], [1, 0], [0, -1]]
    let neighbors = [];

    for (let i = 0; i < moves.length; ++i) {
      let index = XYToIndex(x + moves[i][0], y + moves[i][1])
      if (index !== -1)
        neighbors.push(index)
    }

    return neighbors;
  }

  const toggleCells = (index) => {
    let neighbors = getAdjacentCellIndices(index);

    let newBoard = [...board];

    for (let cell of neighbors) {
      newBoard[cell] = !newBoard[cell]
    }
    newBoard[index] = !newBoard[index];

    setBoard(newBoard);
  }

  return (
    <>
      <Grid
        height={3}
        width={3}
        bgColor={"#34495e"}
        borderColor={"#2c3e50"}
      >
        {
          board.map((cell, index) => {
            if (index === 4) return (<Cell key={index} bgColor={'white'} borderColor={"#2c3e50"}/>)
            else return (
              <Cell
                key={index}
                borderColor={"#2c3e50"}
                bgColor={cell? "#34495e" : "#23384d"}
                onClick={() => toggleCells(index)}
              />
            )
          })
        }
      </Grid>

      <Center>
        <h1>Click on a cell to toggle it and its adjacent neighbors</h1>
        <h2>The cells start turned off, your goal is to turn them all on</h2>
      </Center>
    </>
  );
}

export default App;
