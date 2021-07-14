const Player = (marker) => {
    this.marker = marker

    const getMarker = () => { return marker }

    return { getMarker }
}

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => { return board }

    const setField = (index, marker) => {
        board[index] = marker
    }

    const getField = (index) => { return board[index] }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ''
        }
    }

    return {
        getBoard, setField, getField, clearBoard
    }
})()

const gameController = (() => {
    const playerX = Player('X')
    const playerO = Player('O')
    let turnCount = 0
    let isOver = false

    const getCurrentPlayer = () => {
        if (turnCount % 2 === 0) {
            turnCount++
            return playerX.getMarker()
        } else {
            turnCount++
            return playerO.getMarker()
        }
    }

    const checkWinner = (marker) => {
        const board = gameBoard.getBoard()
        const winningCombosIndices = [
            [0, 1, 2], [0, 3, 6], [0, 4, 8],
            [1, 4, 7], [2, 4, 6], [2, 5, 8],
            [3, 4, 5], [6, 7, 8]
        ]
        
        let result = winningCombosIndices.some(indices => {
            return board[indices[0]] === marker &&
                board[indices[1]] === marker &&
                board[indices[2]] === marker
        })

        if (result) {
            isOver = true
        }

        return result
    }

    const checkGameOver = () => {
        if (isOver) return true 
        else return false
    }

    const reset = () => {
        isOver = false
    }

    return {
        getCurrentPlayer, checkWinner, checkGameOver, reset
    }
})()

const displayController = (() => {
    const fieldsDOM = document.querySelectorAll('.field')
    const messageDOM = document.getElementById('message')
    const restartDOM = document.getElementById('restart-button')

    const displayBoard = () => {
        for (let i = 0; i < fieldsDOM.length; i++) {
            fieldsDOM[i].textContent = gameBoard.getField(i)
        }
    }

    const placeMarker = (evt) => {
        const index = evt.target.dataset.index
        if (evt.target.textContent !== '' || gameController.checkGameOver()) return

        currentPlayer = gameController.getCurrentPlayer()

        gameBoard.setField(index, currentPlayer)

        displayBoard()

        if (currentPlayer === 'X') {
            messageDOM.textContent = "Player O's Turn"
        } else {
            messageDOM.textContent = "Player X's Turn"
        }

        if (gameController.checkWinner('X')) {
            messageDOM.textContent = "Player X Wins!"
        }
        else if (gameController.checkWinner('O')) {
            messageDOM.textContent = "Player O Wins!"
        }
        
        else if (!gameBoard.getBoard().includes('')) {
            messageDOM.textContent = "Draw"
            return
        }
    }

    const clearBoard = () => {
        gameBoard.clearBoard()
        gameController.reset()
        displayBoard()
        messageDOM.textContent = "Player X's Turn"
    }

    fieldsDOM.forEach(field => {
        field.addEventListener('click', placeMarker)
    })

    restartDOM.addEventListener('click', clearBoard)

    return {
        displayBoard, placeMarker
    }
})()