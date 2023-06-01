'use strict'

var gBoard
const gFlag = '🚩'
var gFlagCount = 0
var gContent
var gCount = 0
var gBoardSize
var gLives = 3
var firstClick = true

function onInit(boardSize) {
    gContent = getContent(boardSize)
    firstClick = true
    //console.log('hi')
    gBoard = buildBoard(boardSize, gContent)
    renderBoard(gBoard)
    //expandShown(0,0)
    //countNegsExpand(gBoard,0,0)

}

function buildBoard(boardSize, gContent) {
    var board = []
    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            var currCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                content: gContent.pop(),
                flag: '🚩'
            }
            board[i][j] = currCell
        }
    }
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            // debugger
            var currCell = board[i][j]
            if (currCell.content === '') {
                currCell.content = countNegs(board, i, j)
                if (currCell.content === 0) {
                    currCell.content = ''
                }

            }
        }
    }


    //console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j].content
            var className = `cell cell-${i}-${j}`
            strHTML += `
   <td onclick="onCellClicked(${i},${j})" oncontextmenu="onCellMarked(event,${i},${j})" class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }

    //console.log('strHTML:', strHTML)
    document.querySelector('.board-container').innerHTML = strHTML
}

function onCellClicked(i, j) {
    if (firstClick) {
        if (gBoard[i][j].content === '*') {
            gBoard[i][j].content = ''
            var emptyCell = findEmptyCell()
            emptyCell.content = '*'


            for (var i = 0; i < gBoard.length; i++) {
                for (var j = 0; j < gBoard.length; j++) {
                    // debugger
                    var currCell = gBoard[i][j]
                    if (currCell.content === '*') continue
                    currCell.content = countNegs(gBoard, i, j)
                    if (currCell.content === 0) {
                        currCell.content = ''
                    }


                }
            }
            // renderBoard(gBoard)
        }
        firstClick = false
    }
    if (gBoard[i][j].isMarked) return
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.style.backgroundColor = 'gray'
    elCell.innerText = gBoard[i][j].content
    gBoard[i][j].isShown = true
    gCount++
    if (gBoard[i][j].content === '*') {
        gCount--
        checkLose()
        elCell.style.backgroundColor = 'red'
        setTimeout(function () {
            elCell.style.backgroundColor = 'black'
        }, 2000)
        gBoard[i][j].isMarked = false
        gBoard[i][j].isShown = false

    }
    checkGameOver()
    if (gBoard[i][j].content !== '*') {
        expandShown(i, j)
    }



    //console.log(i, j)

}

function onCellMarked(ev, i, j) {
    ev.preventDefault()
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    if (gBoard[i][j].isShown) return
    if (!gBoard[i][j].isMarked) {
        elCell.innerHTML = gFlag
        gFlagCount++
        gBoard[i][j].isMarked = true
        checkGameOver()

    } else {
        elCell.innerHTML = gBoard[i][j].content
        gBoard[i][j].isMarked = false
        gFlagCount--

    }


    //console.log(gBoard)
    //console.log(elCell.innerHTML)

}

function checkGameOver() {
    var howManyMines
    if (gBoard.length === 4) howManyMines = 2
    else if (gBoard.length === 8) howManyMines = 14
    else howManyMines = 32

    if ((gCount === ((gBoard.length) ** 2) - howManyMines) && (gFlagCount === howManyMines)) {
        victory()
    }



}

function expandShown(i, j) {
    var negsExpand = countNegsExpand(gBoard, i, j)
    var copyNegsExpand = countNegsExpand(gBoard, i, j) //to pop and not change length of arr
    if (!negsExpand) return
    //console.log(negsExpand)
    //debugger
    for (var x = 0; x < negsExpand.length; x++) {
        var currCell = gBoard[negsExpand[x].i][negsExpand[x].j]
        //console.log(currCell)
        if (currCell.isMarked) return
        var elCell = document.querySelector(`.cell-${negsExpand[x].i}-${negsExpand[x].j}`)
        elCell.style.backgroundColor = 'gray'
        if (!currCell.isShown) {
            currCell.isShown = true
            gCount++
            checkGameOver()
            //console.log('gcount', gCount)
        }
        //var currNeg = negsExpand.pop()
        //onCellClicked(currNeg.i, currNeg.j)

    }


}

function beginner() {
    return gBoardSize = 5
    //console.log(gBoardSize)

}

function victory() {
    document.querySelector(".victory").style.display = 'block'
    document.querySelector(".board-container").style.display = 'none'
    var currSmiley = document.querySelector(".smileyRestart")
    currSmiley.innerHTML = '😎'
    //document.querySelector(".resetButton").style.display = 'block'
}

function checkLose() {
    gLives--

    renderLivesLeft()
    if (gLives === 0) {
        var currSmiley = document.querySelector(".smileyRestart")
        currSmiley.innerHTML = '🤯'
        document.querySelector(".lose").style.display = 'block'
        document.querySelector(".board-container").style.display = 'none'
        //document.querySelector(".resetButton").style.display = 'block'

    }

}

function renderLivesLeft() {
    var elLives = document.querySelector('.livesLeft')
    elLives.innerText = 'Lives Left: ' + gLives

}

function playAgain(boardSize) {
    document.querySelector(".lose").style.display = 'none'
    document.querySelector(".victory").style.display = 'none'
    document.querySelector(".board-container").style.display = ''
    var currSmiley = document.querySelector(".smileyRestart")
    currSmiley.innerHTML = '😁'
    gCount = 0
    gFlagCount = 0
    gLives = 3

    renderLivesLeft()
    onInit(boardSize)


}

function wrongCell(elCell) {
    elCell.style.backgroundColor = 'red'
    clearInterval()

}








