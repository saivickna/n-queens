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
  var board = new Board({ n: n});
  var availRows = {};
  var availCols = {};
  for (var i = 0; i < n; i++) {
    availRows[i] = i;
    availCols[i] = i;
  }
  var x, y;
  var solved = false;
  var placeRook = function(numRooks) {
    for (x in availRows) {
      for (y in availCols) {
        board.togglePiece(availRows[x], availCols[y]);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(availRows[x], availCols[y]);
        } else {
          delete availRows[x];
          delete availCols[y]; //remember to add it back
          numRooks++;
          if (numRooks !== n) {
            placeRook(numRooks);
            if (!solved) {
              availRows[x] = x;
              availCols[y] = y;
              board.togglePiece(availRows[x], availCols[y]);
            }

          } else {
            solved = true;
          }

        }
      }
    }
  };
  placeRook(0);
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutions = [];
  var board = new Board({ n: n});
  var availRows = {};
  var availCols = {};
  for (var i = 0; i < n; i++) {
    availRows[i] = i;
    availCols[i] = i;
  }

  var solved = false;
  var placeRook = function(numRooks) {
    var levelRows = _.extend({}, availRows);
    var levelCols = _.extend({}, availCols);
    var x, y, contains;
    for (x in levelRows) {
      for (y in levelCols) {
        board.togglePiece(levelRows[x], levelCols[y]);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(levelRows[x], levelCols[y]);
        } else {
          delete availRows[x];
          delete availCols[y]; //remember to add it back
          numRooks++;
          if (numRooks !== n) {
            placeRook(numRooks);
          } else {
            contains = false;
            var solution = board.rows().map(function(arr) {
              return arr.slice();
            });
            for (var k = 0; k < solutions.length; k++) {
              if (_.isEqual(solutions[k], solution)) {
                contains = true;
              }
            }
            if (!contains) {
              solutions.push(solution);
            }
          }
          availRows[x] = x;
          availCols[y] = y;
          board.togglePiece(levelRows[x], levelCols[y]);
          numRooks--;
        }
      }
    }
  };
  placeRook(0);
  solutionCount = solutions.length;
  //return [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];
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
