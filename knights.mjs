function knightMoves(start, finish) {
    const getIndex = function getIndexFromArray([first, second]) {
        return Number.parseInt(String(first)+ second);
    };

    const getMoves = function getMovesFromStartLocation([firstOriginal, secondOriginal]) {
        const firstNumbers = [ 1, 2, 1, 2, -1, -2, -1, -2];
        const secondNumbers = [2, 1, -2, -1, -2, -1, 2, 1];
        const possibleMoves = [];
        
        for (let i = 0; i < 8; i++) {
          let first = firstOriginal + firstNumbers[i];
          let second = secondOriginal + secondNumbers[i];
          
          if (first < 0 || second < 0 || first > 7 || second > 7) {
            continue;
          }
          
          possibleMoves.push([first, second]);
        }
        
        return possibleMoves;
    };

    const searchMove = function searchForFinishMove(startNode, endLocation) {
        const visited = [];
        const queue = [];
        let knightEnd;

        visited.push(startNode);
        queue.push(startNode);

        while (queue.length) {
            const currentNode = queue.shift();
            if (currentNode.location[0] === endLocation[0] && currentNode.location[1] === endLocation[1]) {
                knightEnd = currentNode;
                break;
            }

            currentNode.moves.forEach((value) => {
                if (visited.indexOf(value) !== -1) {
                    return;
                }

                value.parentMove = currentNode;
                visited.push(value);
                queue.push(value);
            })
        }

        return knightEnd;
    }

    const allMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            allMoves[getIndex([i, j])] = {
                location: [i, j],
                moves: [],
                parentMove: null,
            }
        }
    }

    allMoves.forEach((move) => {
        getMoves(move.location).forEach((moveArr) => {
            move.moves.push(allMoves[getIndex(moveArr)]);
        });
    });

    const knightPath = [];
    const startNode = allMoves[getIndex(start)];
    const startPath = searchMove(startNode, finish);

    let currentMove = startPath;

    while (currentMove != startNode) {
        knightPath.push(currentMove.location);
        currentMove = currentMove.parentMove;
    }

    knightPath.push(currentMove.location);

    knightPath.reverse();

    console.log(`You made it in ${knightPath.length-1} moves! Here's your path:`);
    knightPath.forEach((value) => {
        console.log(value);
    })

    return;
}


knightMoves([0, 0],[7, 7]);