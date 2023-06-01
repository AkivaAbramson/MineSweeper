function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function countNegs(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = mat[i][j]
            if (currCell.content === '*') count++
        }
    }
    return count
}
function getContent(boardSize) {
    var contentArr = []
    if (boardSize === 4) {
        for (var i = 0; i < 2; i++) contentArr.push('*')
        for (var i = 0; i < 14; i++) contentArr.push('')
    }
    if (boardSize === 8) {
        for (var i = 0; i < 14; i++) contentArr.push('*')
        for (var i = 0; i < 50; i++) contentArr.push('')
    }
    if (boardSize === 12) {
        for (var i = 0; i < 32; i++) contentArr.push('*')
        for (var i = 0; i < 112; i++) contentArr.push('')
    }
    shuffleArr(contentArr)
    //console.log(contentArr)
    return contentArr

}

function countNegsExpand(mat, rowIdx, colIdx) {
    var negs = []
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = mat[i][j]
            if (currCell.content === '*') return
            negs.push({ 'i': i, 'j': j })
        }
    }

    return negs
    //console.log(negs)

}

function shuffleArr(arr) {
    return arr.sort((a, b) => 0.5 - Math.random())
}

function findEmptyCell() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].content === '')
                return gBoard[i][j]
        }

    }
}