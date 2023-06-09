const gameBoard = (() => {
  let board;
  let row = 3;

  const initBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    renderBoard();
  };

  const getCurrentBoard = () => {
    return board;
  };

  const appendToBoard = (row, col, symbol) => {
    board[row][col] = symbol;
  };

  const placeSymbol = (row, column, symbol) => {
    board[row][column] = symbol;
    renderBoard();
  };

  const renderBoard = () => {
    const cells = Array.from(document.querySelectorAll(".cell")); //returns 9 divs
    let counter = 0;
    // debugger
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
        if (board[j][i] === "x") {
          xSvgMaker(cells[counter]);
        } else if (board[j][i] === "o") {
          oSvgMaker(cells[counter]);
        } else {
          cells[counter].textContent = "";
        }
        counter++;
      }
    }
    // checkGame();
  };

  const xSvgMaker = (target) => {
    target.innerHTML = "";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M4,4 L20,20 M20,4 L4,20");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");

    svg.append(path);
    target.append(svg);
  };

  const oSvgMaker = (target) => {
    target.innerHTML = "";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "10");
    circle.setAttribute("stroke", "currentColor");
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("fill", "none");

    svg.appendChild(circle);
    target.append(svg);
  };

  initBoard();

  return {
    getCurrentBoard,
    appendToBoard,
    placeSymbol,
    initBoard,
    xSvgMaker,
    oSvgMaker
  };
})();

const PlayerFactory = (name, symbol) => {
  let score = 0;

  const getName = () => {
    return name;
  };
  const getSymbol = () => {
    return symbol;
  };
  const setScore = () => {
    score++;
    console.log(`name:${score}`);
  };

  const getScore = () => {
    return score;
  };

  return {
    setScore,
    getName,
    getScore,
    getSymbol,
  };
};

const pageManager = (() => {
  let singlePlayerGame,multiplePlayerGame,p1IsX;

  const p1Form = document.querySelector(".p1-form");
  const p1Name = document.querySelector("#p1-name");

  const p2Form = document.querySelector(".p2-form");
  const p2Name = document.querySelector("#p2-name");

  const gameLevelSelect= document.querySelector("#game-level-select");
  const singlePForm = document.querySelector(".single-p-form");
  const singlePName = document.querySelector("#single-p-name");

  const xRadio = document.querySelector(".x-radio");
  const oRadio = document.querySelector(".o-radio");

  let scoreContainer = document.querySelector(".score-container");
  let p2ScoreSpan = document.querySelector(".p2-score-span");

  const newGame = () => {
    document.querySelector(".p-vs-ai-container").classList.add("active");
    document.querySelector(".p1-form").classList.add("active");
    bindEventListeners();
  };

  const bindEventListeners = () => {
    document
      .querySelector(".p-vs-ai-header")
      .addEventListener("click", showSinglePlayerForm);
    document
      .querySelector(".p-vs-p-header")
      .addEventListener("click", showMultiplePlayerForm);

    p1Form.addEventListener("submit", p1FormSubmission);
    p1Name.addEventListener("input", p1FluidValidity);
    // p1Name.addEventListener("input", checkInputLength);

    p2Form.addEventListener("submit", p2FormSubmission);
    p2Name.addEventListener("input", p2FluidValidity);
    // p2Name.addEventListener("input", checkInputLength);

    xRadio.addEventListener("input", radioFluidValidity);
    oRadio.addEventListener("input", radioFluidValidity);

    singlePForm.addEventListener("submit", singlePlayerFormSubmission);
    singlePName.addEventListener("input", singlePFluidValidity);
    gameLevelSelect.addEventListener("input", selectLevelFluidValidity)
    // singlePName.addEventListener("input", checkInputLength);

    document.querySelector(".close-btn-container").addEventListener("click", hideEndPage);
  };

  const showSinglePlayerForm = () => {
    document.querySelector(".p-vs-ai-header").classList.add("active");
    document.querySelector(".p-vs-ai-container").classList.add("active");
    document.querySelector(".single-player-svg").classList.add("active");
    document.querySelector(".ai-svg").classList.add("active");
    
    document.querySelector(".p-vs-p-container").classList.remove("active");
    document.querySelector(".p-vs-p-header").classList.remove("active");
    document.querySelector(".player-one-svg").classList.remove("active");
    document.querySelector(".player-two-svg").classList.remove("active");

    p1Form.classList.add("active");
    p2Form.classList.remove("active");
    
    document.querySelector(".p1-name-error").textContent ="";
    document.querySelector(".p2-name-error").textContent ="";
    document.querySelector(".symbol-error").textContent ="";
    p1Form.reset();
    p2Form.reset();
  };
  
  const showMultiplePlayerForm = () => {
    document.querySelector(".p-vs-p-container").classList.add("active");
    document.querySelector(".p-vs-p-header").classList.add("active");
    document.querySelector(".player-one-svg").classList.add("active");
    document.querySelector(".player-two-svg").classList.add("active");
    
    document.querySelector(".p-vs-ai-container").classList.remove("active");
    document.querySelector(".p-vs-ai-header").classList.remove("active");
    document.querySelector(".single-player-svg").classList.remove("active");
    document.querySelector(".ai-svg").classList.remove("active");

    document.querySelector(".single-p-name-error").textContent ="";
    document.querySelector(".level-select-error").textContent ="";

    singlePForm.reset();
    
  };

  const hideStartScreen = () => {
    document.querySelector(".start-screen-container").classList.add("hide");
  };

  const showStartScreen = () =>{
    document.querySelector(".start-screen-container").classList.remove("hide");
  };

  const showBoard = () => {
    document.querySelector(".board-container").classList.add("active");
    scoreContainer.classList.add("active")
    hideStartScreen();
  };

  const displayPlayersOnPage = (p1IsX, singlePlayerGame)=>{
    document.querySelector(".p1-display-name").textContent = p1.getName();
    document.querySelector(".p2-display-name").textContent = p2.getName();

    if (p1IsX || singlePlayerGame ) {
      gameBoard.xSvgMaker(document.querySelector(".p1-svg-container"));
      gameBoard.oSvgMaker(document.querySelector(".p2-svg-container"));
    } else {
      gameBoard.xSvgMaker(document.querySelector(".p2-svg-container"));
      gameBoard.oSvgMaker(document.querySelector(".p1-svg-container"));
    }
  };

  const hideBoard = () => {
    document.querySelector(".board-container").classList.remove("active");
    scoreContainer.classList.remove("active")
  };

  const clearAllData = ()=>{
    document.querySelector(".winner-msg").textContent = "";
    document.querySelector(".score-update").textContent = "";
    document.querySelector(".p1-display-name").textContent = "";
    document.querySelector(".p2-display-name").textContent = "";
    document.querySelector(".p1-svg-container").textContent = "";
    document.querySelector(".p2-svg-container").textContent = "";

    singlePlayerGame = null;
    multiplePlayerGame = null;
  };

  const showEndPage = ()=>{
    document.querySelector(".end-page").showModal();
  };
  
  const hideEndPage = ()=>{
    let endPage = document.querySelector(".end-page");
    endPage.close();
  };
  
  const singlePlayerFormSubmission = (e) => {
    e.preventDefault();
    let name;
    singlePlayerGame = true;

    if(!singlePName.validity.valid && !gameLevelSelect.validity.valid){
      document.querySelector(".level-select-error").textContent =
      "*You must select a level";
      document.querySelector(".single-p-name-error").textContent =
      "*You must input a name";
      return;
    }
    else if (!gameLevelSelect.validity.valid){
      document.querySelector(".level-select-error").textContent =
      "*You must select a level";
      return
    }
    else if (!singlePName.validity.valid) {
      document.querySelector(".single-p-name-error").textContent =
        "*You must input a name";
      return;
    }
    else {
      level = getLevel()
      pageManager.showBoard();
      name = singlePName.value;
      p1Symbol = "x";
      singlePlayerGame = true;
      multiplePlayerGame = false;
      p1 = PlayerFactory(name, p1Symbol);
      p2 = PlayerFactory("AI", "o");
      displayPlayersOnPage(p1IsX,singlePlayerGame);
      gameFlow.startSinglePlayerGame(level);
      singlePForm.reset();
  
    }

  };

  const p1FormSubmission = (e) => {
    e.preventDefault();
    let name;

    if (!p1Name.validity.valid && !xRadio.checked && !oRadio.checked){
      document.querySelector(".p1-name-error").textContent ="*You must input a name";
      document.querySelector(".symbol-error").textContent ="*Please select a symbol";
      return;

    }

    if (!p1Name.validity.valid) {
      document.querySelector(".p1-name-error").textContent =
        "*You must input a name";
      return;
    }

    if (!xRadio.checked && !oRadio.checked) {
      document.querySelector(".symbol-error").textContent =
        "*Please select a symbol";
      return
    } else {
      singlePlayerGame = false;
      multiplePlayerGame = true;
      name = p1Name.value;
      p1Symbol = xRadio.checked ? "x" : "o";
      p1IsX = xRadio.checked ? true : false;
      p1 = PlayerFactory(name, p1Symbol);

      p1Form.classList.remove("active");
      p2Form.classList.add("active");
    }
  };

  const p2FormSubmission = (e) => {
    if (!singlePlayerGame) {
      e.preventDefault();
      let name;

      if (!p2Name.validity.valid) {
        document.querySelector(".p2-name-error").textContent =
          "*You must input a name";
      } else {
        singlePlayerGame = false;
        name = p2Name.value;
        p2Symbol = p1.symbol === "x" ? "o" : "x";
        p2 = PlayerFactory(name, p2Symbol);
        displayPlayersOnPage(p1IsX,singlePlayerGame);
        hideStartScreen();
        p1Form.classList.add("active");
        p2Form.classList.remove("active");
        showBoard();
        p1Form.reset();
        p2Form.reset();
        gameFlow.startMultiplePlayerGame()
      }
    }
  };

  //////////////////Fluid Form Validation///////////////////////////
  const p1FluidValidity = () => {
    if (p1Name.validity.valid) {
      document.querySelector(".p1-name-error").textContent = "";
    }
  };

  const p2FluidValidity = () => {
    if (p2Name.validity.valid) {
      document.querySelector(".p2-name-error").textContent = "";
    }
  };

  const radioFluidValidity = () => {
    if (xRadio.checked || oRadio.checked) {
      document.querySelector(".symbol-error").textContent = "";
    }
  };

  const singlePFluidValidity = () => {
    if (singlePName.validity.valid) {
      document.querySelector(".single-p-name-error").textContent = "";
    }
  };

  const selectLevelFluidValidity = ()=>{
    if (gameLevelSelect.validity.valid){
      document.querySelector(".level-select-error").textContent ="";
    }
  };

  const getSinglePGameType = ()=>{
    return singlePlayerGame
  }

  const getMultiplePGameType = ()=>{
    return multiplePlayerGame
  }

  const getLevel = ()=>{
    return gameLevelSelect.value
  };

  newGame();

  return {
    newGame,
    showBoard,
    showStartScreen,
    hideBoard,
    displayPlayersOnPage,
    showEndPage,
    hideEndPage,
    clearAllData,
    getSinglePGameType,
    getMultiplePGameType
  };
})();

const aiModule = (() => {
  let bestMove;
  const ai = "o";
  const human = "x";

  const getBestMove = () => {
    return bestMove;
  };

  const evaluate = (board) => {
    const winningCombos = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ], //rows
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ], //col
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ], //diagonal
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    // Check for a winner
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        board[a[0]][a[1]] !== "" &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        if (board[a[0]][a[1]] === human) return -1; // Human wins
        else return 1; // AI wins
      }
    }

    // Game is a draw
    if (isBoardFull(board)) return 0;

    // No winner yet
    return null;
  };

  // Check if the board is full
  const isBoardFull = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") return false;
      }
    }
    return true;
  };

  const minimax = (board, depth, isMaximizing) => {
    let result = evaluate(board);
    // Base cases
    if (depth === 0 || result !== null) {
      return result;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check empty spots
          if (board[i][j] === "") {
            // Simulate a move
            board[i][j] = ai;
            // Call minimax recursively
            let score = minimax(board, depth - 1, false);
            // Undo move
            board[i][j] = "";
            // Update bestScore and move if necessary
            if (score > bestScore) {
              bestScore = score;
              move = [i, j];
            }
          }
        }
      }
      bestMove = move;
      return bestScore;
    } else {
      let bestScore = Infinity;
      let move;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check empty spots
          if (board[i][j] === "") {
            // Simulate a move
            board[i][j] = human;
            // Call minimax recursively
            let score = minimax(board, depth - 1, true);
            // Undo move
            board[i][j] = "";
            // Update bestScore and move if necessary
            if (score < bestScore) {
              bestScore = score;
              move = [i, j];
            }
          }
        }
      }
      bestMove = move;
      return bestScore;
    }
  };

  return {
    evaluate,
    isBoardFull,
    minimax,
    getBestMove,
  };
})();

//----------------Game Flow--------------------//
const gameFlow = (() => {
  let cells, isXsTurn, board, p1IsX,multiplePlayerGame,singlePlayerGame,gameIsOver,depth; 
  let winningCells;
  let turns = 0;
  const human = "x";
  const ai = "o";

  let p1ScoreSpan = document.querySelector(".p1-score-span");
  let p2ScoreSpan = document.querySelector(".p2-score-span");
  
  const initNewGame = () => {
    initPlayAgain();
    pageManager.hideBoard();
    pageManager.showStartScreen();
    pageManager.clearAllData();
    p1ScoreSpan.textContent = 0;
    p2ScoreSpan.textContent = 0;
    multiplePlayerGame = false;
    singlePlayerGame = false;
    removeEventsMultipleP();
    removeEventsSingleP();
  };
  
  const initPlayAgain = () => {
    turns = 0;
    isXsTurn = true;
    winningCells = undefined;
    gameIsOver=false;
    gameBoard.initBoard();
    board = gameBoard.getCurrentBoard();
    cells = Array.from(document.querySelectorAll(".cell"));
    bindGeneralEventListeners();
    p1ScoreSpan.classList.remove("active");
    p2ScoreSpan.classList.remove("active");
    singlePlayerGame = pageManager.getSinglePGameType();
    multiplePlayerGame = pageManager.getMultiplePGameType();
    console.log(singlePlayerGame , multiplePlayerGame)
    pageManager.hideEndPage();
    if (singlePlayerGame){
      bindSingleGameCellEvents()
    }
    else if (multiplePlayerGame) {
      bindMultiplePlayersGameCellEvents()
    }
  };

  const bindGeneralEventListeners = ()=>{
    Array.from(document.querySelectorAll(".play-again-btn")).forEach( btn =>{
      btn.addEventListener("click", initPlayAgain)
    });

    Array.from(document.querySelectorAll(".new-game-btn")).forEach( btn =>{
      btn.addEventListener("click", initNewGame)
    });

  };

  
  //----------------Single Player Game--------------------//
  const bindSingleGameCellEvents = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", singlePlayerTurn);
    });
  };

  const removeEventsSingleP = () => {
    cells.forEach((cell) => {
      cell.removeEventListener("click", singlePlayerTurn);
    });
  };

  const startSinglePlayerGame = (level) => {
    if (level === "easy"){
      depth = 2;
    }else if (level === "medium"){
      depth = 5;
    } else {depth = 9}
    singlePlayerGame = true;
    bindSingleGameCellEvents();
    isXsTurn = true;
  };

  const singlePlayerTurn = (e) => {
    if (singlePlayerGame){
      let currentRow = Number(e.currentTarget.getAttribute("data-row"));
      let currentColumn = Number(e.currentTarget.getAttribute("data-column"));
      board = gameBoard.getCurrentBoard();
      console.log(board);

      // Makes sure cell is empty.
      if (board[currentRow][currentColumn] === "") {
        turns++;

        gameBoard.placeSymbol(currentRow, currentColumn, human);
        checkGame(currentRow, currentColumn, human);
        console.log(turns)
        if (!gameIsOver){
          aiTurn();
        }
      }
    }
  };

  const aiTurn = () => {
    if (turns<9){
      board = gameBoard.getCurrentBoard();
      console.log("depth: "+depth)
      aiModule.minimax(board,depth,true);
      let bestMove = aiModule.getBestMove();
      gameBoard.appendToBoard(bestMove[0], bestMove[1], ai);
      gameBoard.placeSymbol(bestMove[0], bestMove[1], ai);
      turns++
      // debugger
      console.log(turns)
      checkGame(bestMove[0], bestMove[1], ai);
    }
  };


  //----------------Multiple Player Game--------------------//

  const bindMultiplePlayersGameCellEvents = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", multiplePTurn);
    });
  };

  const removeEventsMultipleP = ()=>{
    cells.forEach((cell) => {
      cell.removeEventListener("click", multiplePTurn);
    });
  };

  const startMultiplePlayerGame = ()=>{
    singlePlayerGame = false;
    bindMultiplePlayersGameCellEvents()
    isXsTurn = true;
    const p1Symbol = p1.getSymbol();
    p1IsX = p1Symbol === "x" ? true : false;
  };


  const multiplePTurn = (e) => {
    let currentRow = Number(e.currentTarget.getAttribute("data-row"));
    let currentColumn = Number(e.currentTarget.getAttribute("data-column"));
    board = gameBoard.getCurrentBoard();

    // Makes sure cell is empty.
    if (board[currentRow][currentColumn] === "") {
      let symbol = isXsTurn ? "x" : "o";
      turns++;

      gameBoard.placeSymbol(currentRow, currentColumn, symbol);
      checkGame(currentRow, currentColumn, symbol);
      isXsTurn = !isXsTurn;
    }
  };

  //------------------Check Game------------------//
  const checkGame = (row, column, symbol) => {
    if (turns > 4) {
      // debugger
      let checkRowVar = checkRow(row, symbol);
      let checkColumnVar = checkColumn(column, symbol);
      let checkDiagonalVar = false;
      if (row === column || row + column === 2) {
        checkDiagonal(symbol);
      }
      if (turns === 9 && !checkRowVar && !checkColumnVar && !checkDiagonalVar){
        winner("tie")
      }
    }
    
  };

  //Individual Checkers
  const checkRow = (row, symbol) => {
    // Row loop
    if (
      board[row][0] !== "" &&
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2]
    ) {
      winningCells = {"row": row};
      winner(symbol);
      return true
    }else {return false}
  };

  //Individual Checkers
  const checkColumn = (column, symbol) => {
    if (
      board[0][column] !== "" &&
      board[0][column] === board[1][column] &&
      board[0][column] === board[2][column]
    ) {
      winningCells = {"column":column};
      winner(symbol);
      return true
    }else {return false}
  };

  //Individual Checkers
  const checkDiagonal = (symbol) => {
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      winningCells = {"diagonal": "right"};
      winner(symbol);
      return true
    }

    else if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      winningCells = {"diagonal": "left"};
      winner(symbol);
      return true
    }
    else {return false}
  };

  //------------------Win or Tie-------------------------//
  const winner = (symbol) => {
    removeEventsSingleP();
    removeEventsMultipleP();
    gameIsOver = true;

    if (singlePlayerGame) {
      if (symbol === "x") {
        p1.setScore();
        displayWinner(p1, p2, symbol);
      } else if (symbol === "o") {
        p2.setScore();
        displayWinner(p2, p1, symbol);
      } else {
        displayWinner("tie", "tie");
      }
    }

    else if (symbol === "tie"){
      displayWinner("tie","tie")
    }

    else {
      if (symbol === "x") {
        if (p1IsX) {
          // Must be before displayWinner().
          p1.setScore();
          displayWinner(p1, p2, symbol);
        } else {
          console.log("Player Two is the winner");
          p2.setScore();
          displayWinner(p2, p1, symbol);
        }
      } else {
        if (p1Symbol === "o") {
          console.log("Player One is the winner");
          p1.setScore();
          displayWinner(p1, p2, symbol);
        } else {
          console.log("Player Two is the winner");
          p2.setScore();
          displayWinner(p2, p1, symbol);
        }
      }
    }
  };

  const displayWinner = (winner, loser,symbol) => {
    startWinningAnimation();
    if (winner === "tie") {
      let p1Name = p1.getName();
      let p2Name = p2.getName();
      let wScore = p1.getScore();
      let lScore = p2.getScore();
      document.querySelector(".winner-msg").textContent = "It's A Tie";
      document.querySelector(".score-update").textContent = `The score is ${wScore} for ${p1Name} and ${lScore} for ${p2Name} !!`;
    
      p1ScoreSpan.textContent = wScore;
      p2ScoreSpan.textContent = lScore;
      startScoreAnimation();
      pageManager.showEndPage();
    
  } else {
      let winnerName = winner.getName();
      let loserName = loser.getName();
      let wScore = winner.getScore();
      let lScore = loser.getScore();

      document.querySelector(".winner-msg").textContent = `${winnerName} is the winner!!`;
      document.querySelector(".score-update").textContent = `The score is ${wScore} for ${winnerName} and ${lScore} for ${loserName} !!`;
      
      if (singlePlayerGame && symbol === "o"){
        p2ScoreSpan.textContent = wScore;
        p1ScoreSpan.textContent = lScore;
        startScoreAnimation();

      }
      else if (singlePlayerGame && symbol === "x"){
        p1ScoreSpan.textContent = wScore;
        p2ScoreSpan.textContent = lScore;
        startScoreAnimation();
        
      }
      else if (!singlePlayerGame && p1IsX && symbol === "x"){
        p1ScoreSpan.textContent = wScore;
        p2ScoreSpan.textContent = lScore;
        startScoreAnimation();
      }
      else if (!singlePlayerGame && p1IsX && symbol === "o"){
        p2ScoreSpan.textContent = wScore;
        p1ScoreSpan.textContent = lScore;
      }
      else if (!singlePlayerGame && !p1IsX && symbol === "x"){
        p2ScoreSpan.textContent = wScore;
        p1ScoreSpan.textContent = lScore;
      }
      else if (!singlePlayerGame && !p1IsX && symbol === "o"){
        p1ScoreSpan.textContent = wScore;
        p2ScoreSpan.textContent = lScore;
      }

      pageManager.showEndPage();
    }
  };

  const startScoreAnimation =()=>{
    p1ScoreSpan.classList.add("active");
    p2ScoreSpan.classList.add("active");
  };

  const startWinningAnimation = ()=>{
    console.log(winningCells)
  };

  initNewGame();


  

  return {
    startSinglePlayerGame,
    startMultiplePlayerGame
  };
})();

// const =()=>{};
