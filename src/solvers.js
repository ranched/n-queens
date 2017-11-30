/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  const board = new Board({n: n});
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  solutionCount = 0;
  pieceCount = 0;
  recursiveCalls = 0;
  const nextStep = function(n, board = new Board({n: n}), /*pieceCount = 0, */r = 0, c = 0) {
    if(recursiveCalls === 20) {
      debugger;
    }
    if(board.hasAnyRooksConflicts()) {
      board.rows()[r][c] = 0;
      pieceCount -= 1;
      return;
    } else if(pieceCount === n) {
      solutionCount++;
      return;
    }
    for(let r = 0; r < n; r++) {
      for(let c = 0; c < n; c++) {
        const matrix = board.rows().slice();
        if(!matrix[r][c]) {
          matrix[r][c] = 1;
          pieceCount++;
          recursiveCalls++;
          nextStep(n, new Board(matrix), /*pieceCount += 1, */r, c);
        }
      }
    }
    return;
  }
  nextStep(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
