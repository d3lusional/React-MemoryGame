import React, { Component } from 'react';
import './App.css';
/*

Memory Game
  Game Play State
    Uninitialized State
    Unrevealed Board State
    Memorize State
    Guess State
    Check State
  User gets 4 chances (one for each possible square)
  Countdowns
  Unrevealed Board State and Memorize State (3000 milliseconds)
  Memorize State and the Guess State (501 milliseconds)
  Guess State and Check State (3000 milliseconds)
  Colors
  Grey for unselected button
  Blue for button to memorize
  Green for correct guess
  Red for incorrect guess
  Yellow for missed guess
  Bottom button changes between labels and buttons
  Display changes are based off of Game Play State

*/


// Board needs to be abstracted into stateful component
// Footer also needs to be abstracted into the same stateful component





const makeSquare = () => {
  return { systemSelected: false, userClicked: false}

}

const squareObj = {
  systemSelected: false,
  userClicked: false
}

const generateSquares = () => {
  const arr = [];
  for(let i = 0; i < 12; i++) {
    
    arr.push(makeSquare());
    console.log(arr)
  }
  return arr;
}


const getColor = (square, currentBoardState) => {
  /*
  //==if currentBoardstate is memorized AND square.systemSelected 
    //==return 'blue';
  //==else if currentBoardstate is checkstate
    //==if square.systemSelected AND square.userSelected
      //==return 'green'
    //==else if square.systemSelected AND NOT square.userSelected
      //==return 'yellow'
    //==else if NOT square.systemSelected AND square.userSelected
      //==return 'red'
    //else
      //return 'gray'
  // else
    //return 'gray'
*/
  if (currentBoardState === "memorize" && square.systemSelected === true ) {
    return 'blue';
  }
  else if (currentBoardState === "check"){
    return 'green';
  } else if (square.systemSelected && square.userClicked === false){
  return 'yellow'
  } else if (square.systemSelected === false && square.userClicked === true){
    return 'red';
  } else {
    return 'gray'
  }
}

class Square extends React.Component {
  render() {
    console.log("in square")
    return (
      <button onClick={() => {this.props.setValue(this.props.position)}} className="square" style={{backgroundColor: getColor(this.props.inputData, this.props.currentBoardState)}}>
        {this.props.inputData.val}
      </button>
    );
  }
}

class BoardState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoardState: 'uninitialized',
      squaresArray: generateSquares(),
      userSelected: false,
      randomSelected: true,
    }
  }

  updateBoardState() {
    let newState = ''
    switch(this.state.currentBoardState) {
      case 'uninitialized':
        newState = 'unrevealed';
        break;
      case 'unrevealed':
        newState = 'memorize';
        break;
      case 'memorize':
        newState = 'guess';
        break;
      case 'guess':
        newState = 'check';
        break;
      case 'check':
        newState = 'unrevealed';
        break;
      default:
        throw new Error('Something bad happened')
      }
      this.setState({currentBoardState: newState});
    }
    
  updateSquare(RandomArr) {
    //set the array for squares 
      let squares = this.state.squaresArray
      //randomSelected = true;
      //localSquaresArr[]
      
      for(let i = 0; i < RandomArr.length; i++){
        squares[RandomArr[i]].systemSelected = true
        console.log("update square:" +squares[RandomArr[i]].systemSelected)
      }
      this.setState({squaresArray: squares})


      /* 
      let localRandomArr = RandomArr;
      let iterator = RandomArr.values();
      for (let numbers of iterator){
        console.log("RandomArr: " + iterator.next().value)
      }
    */
  }

  userClicked(i) {
    let square = this.state.squaresArray[i];           
     square.userClicked = true;
     let localSquaresArr = this.state.squaresArray.slice(0);
     localSquaresArr[i] = square;
     console.log(localSquaresArr)
     this.setState({squaresArray: localSquaresArr})

  }
  

  randomize(randomizeArray) {
    // This function will randomize the squares array in state
    let random = Math.floor((Math.random() * 12) );
    return random;
    
  }
  
  renderSquare(i) {
    return <Square inputData={this.state.squaresArray[i]} currentBoardState={this.state.currentBoardState} position={i} setValue={this.userClicked.bind(this)} />;
  }

  guessState () {
    this.state.currentBoardState = "guess";
    console.log("hi from guess state")
  }

  gameStart() {
    let timeoutID 
    let RandomArr = [];
    //create 4 random numbers 
    while (RandomArr.length < 4){
      let tempRandom = this.randomize() 
        if (RandomArr.includes(tempRandom)){ 
          //do nothing
        } else {
          RandomArr.push(tempRandom)
        }
     this.updateSquare(RandomArr)
      this.state.currentBoardState = "memorize";
     console.log(this.state.currentBoardState);
    timeoutID = window.setTimeout(this.guessState.bind(this), 3000)   
    }
      
    }
    
    render() {  
      return (
        <div>
        <div ></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <button onClick={() => {this.gameStart()}}>New Game</button>
      </div>
    
  );
}

}

/* 

<div className="Board-State">
<div className="board">
<div className="row">
<button className="board-button" ></button>
<button onClick={this.userClicked.bind(this)}>
<button className="board-button"></button>
<button className="board-button"></button>
<button className="board-button"></button>
</div>
<div className="row">
<button className="board-button"></button>
<button className="board-button"></button>
<button className="board-button"></button>
<button className="board-button"></button>
</div>
<div className="row">
<button className="board-button"></button>
<button className="board-button"></button>
<button className="board-button"></button>
<button className="board-button"></button>
</div>
</div>
<div className="footer">
<button onClick={this.gameStart()}>Start Game</button>
</div>
</div>
*/


  const App = props => (
    <div className="App">
      <h1 className="header" >Memory Game</h1>
      <BoardState />
    </div>
  )


export default App;