'use strict'

var gBoard
const gFlag = '🚩'
var gContent = getContent()
var gCount = 0

function onInit() {
    //console.log('hi')
    gBoard = buildBoard(5)
    renderBoard(gBoard)
    //expandShown(0,0)
   //countNegsExpand(gBoard,0,0)
    
}

function buildBoard(boardSize) {
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


    console.table(board)
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
    if(gBoard[i][j].isMarked) return
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.style.backgroundColor = 'gray'
    gBoard[i][j].isShown = true
    gCount++
    if(gBoard[i][j].content !== '*'){
        expandShown(i,j)
    }
    if(gBoard[i][j].content === '*'){
        alert('you lose!')
    }
    checkGameOver()



    console.log(i, j)

}

function onCellMarked(ev, i, j) {
    ev.preventDefault()
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    if(gBoard[i][j].isShown) return
    if(!gBoard[i][j].isMarked){
        elCell.innerHTML = gFlag
        gBoard[i][j].isMarked = true  
    } else{
        elCell.innerHTML = gBoard[i][j].content
        gBoard[i][j].isMarked = false 
    }
    
    
    console.log(gBoard)
    console.log(elCell.innerHTML)

}

function checkGameOver(){
    if(gCount === (5**2)-8){
        alert('you won!')
    }

}

function expandShown(i,j){
    var negsExpand = countNegsExpand(gBoard, i,j)
    var copyNegsExpand = countNegsExpand(gBoard, i,j) //to pop and not change length of arr
    console.log(negsExpand)
    for(var i = 0; i<negsExpand.length;i++){
        var currNeg = negsExpand.pop()
        onCellClicked(currNeg.i,currNeg.j)

    }


}




