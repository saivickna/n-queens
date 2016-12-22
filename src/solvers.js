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
  var board = new Board({n: n});
  var availRows = {};
  for (var i = 0; i < n; i++) {
    availRows[Math.pow(2, i)] = Math.pow(2, i);
  }
  var found = false;
  var solution = [];
  var finalSolution;

  var placeRook = function() {
    var levelRows = _.extend({}, availRows);
    for (var x in levelRows) {
      solution.push(levelRows[x]);
      delete availRows[x];
      if (Object.keys(availRows).length === 0) {
        found = true;
        finalSolution = solution.slice();
      }
      if (!found) {
        placeRook();
      }
      solution.pop();
      availRows[x] = x;
    }
  };
  placeRook();
  for (var j = 0; j < finalSolution.length; j++) {
    board.togglePiece(j, Math.log2(finalSolution[j]));
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var availRows = {};
  for (var i = 0; i < n; i++) {
    availRows[Math.pow(2, i)] = Math.pow(2, i);
  }
  var solutionCount = 0;
  var solution = [];
  var placeRook = function () {
    var levelRows = _.extend({}, availRows);
    for (var x in levelRows) {
      solution.push(levelRows[x]);
      delete availRows[x];
      if (Object.keys(availRows).length === 0) {
        solutionCount++;
      } else {
        placeRook();
      }
      solution.pop();
      availRows[x] = x;
    }
  };
  placeRook();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var availRows = {};
  for (var i = 0; i < n; i++) {
    availRows[Math.pow(2, i)] = Math.pow(2, i);
  }
  var found = false;
  var solution = [];
  var finalSolution = [];

  var placeQueen = function() {
    var levelRows = _.extend({}, availRows);
    for (var x in levelRows) {
      solution.push(levelRows[x]);
      delete availRows[x];
      var conflict = false;
      for (var k = 0; k < solution.length - 1; k++) {
        var shiftAmount = solution.length - 1 - k;
        if (levelRows[x] === (solution[k] >> shiftAmount) || ((levelRows[x] >> shiftAmount) === solution[k])) {
          conflict = true;
          break;
        }
      }
      if (!conflict) {
        if (Object.keys(availRows).length === 0) {
          found = true;
          finalSolution = solution.slice();
        }
        if (!found) {
          placeQueen();
        }
      }
      solution.pop();
      availRows[x] = levelRows[x];
    }
  };

  placeQueen();
  for (var j = 0; j < finalSolution.length; j++) {
    board.togglePiece(j, Math.log2(finalSolution[j]));
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var availRows = {};
  for (var i = 0; i < n; i++) {
    availRows[Math.pow(2, i)] = Math.pow(2, i);
  }
  var solution = [];

  var placeQueen = function() {
    var levelRows = _.extend({}, availRows);
    for (var x in levelRows) {
      solution.push(levelRows[x]);
      delete availRows[x];
      var conflict = false;
      for (var k = 0; k < solution.length - 1; k++) {
        var shiftAmount = solution.length - 1 - k;
        if (levelRows[x] === (solution[k] >> shiftAmount) || ((levelRows[x] >> shiftAmount) === solution[k])) {
          conflict = true;
          break;
        }
      }
      if (!conflict) {
        if (Object.keys(availRows).length === 0) {
          solutionCount++;
        }
        placeQueen();
      }
      solution.pop();
      availRows[x] = levelRows[x];
    }
  };

  placeQueen();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
