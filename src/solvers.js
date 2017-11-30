/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

//Returns a set of unique permutations for 1 to n
window.generatePermutations = function(n, stopPoint) {
  var generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;  
  }

  function factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
     else {
          return (num * factorialize(num - 1));
      }
  }

  var insertNum = (length, arr) => {
    var rando = generateRandom(1, length + 1);
    if(arr.includes(rando)){
      insertNum(length, arr);
    } else {
      arr.push(rando);
    }
  }

  var generatePerm = (n) => {
    var perm = []
    while(perm.length !== n){
      insertNum(n, perm)
    }
    return perm
  }

  var generateAllPerms = (n) => {
    var totalPermsCount = factorialize(n);
    var perms = new Set();
    while(perms.size !== totalPermsCount && stopPoint !== perms.size){
      perms.add(generatePerm(n).toString());
    }
    return perms;
  }

  return generateAllPerms(n)
};

//ngenerates an array of board rows with one piece in each, and no conflicting columns
var generateRows = (n) => {
  var rows = [];
  for (var i = 0; i < n; i++){
    var row = [];
    for (var j = 0; j < n; j++){
      if(j === i){
        row.push(1);
      } else {
        row.push(0);
      }
    }
    rows.push(row);
  }
  return rows;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var rows = generateRows(n);
  var firstSolution = generatePermutations(n, 1);
  var solutionRowOrder = [...firstSolution];
  var boardLayout = [];
  if(n > 1) {solutionRowOrder = solutionRowOrder[0].split(',')}
  solutionRowOrder.forEach( index => {
    boardLayout.push(rows[parseInt(index) - 1]);
  });
  var solution = boardLayout; 

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = generatePermutations(n).size;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = window.countNQueensSolutions(n, true); //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, first) {
  var rows = generateRows(n);
  var permutations = generatePermutations(n);
  permutations = [...permutations];
  layoutRowOrder = permutations.map( i => i.split(',') );
  var earlyReturn = false;
  var solutionCount = 0; //fixme
  layoutRowOrder.forEach( layoutIndices => {
    if(layoutIndices[0].length === 0) { layoutIndices.pop(); }
    layoutIndices = layoutIndices.map( i => parseInt(i)) ;
    let boardLayout = [];
    layoutIndices.forEach( index => {
      boardLayout.push(rows[index - 1]);
    });
    let boardToTest = new Board(boardLayout);
    if(!boardToTest.hasAnyQueensConflicts()){
      if(first){
        earlyReturn = boardLayout;
      }
      solutionCount++;
    }
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return earlyReturn ? earlyReturn : solutionCount;
};
