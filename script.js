const Player = (marker) => {
    this.marker = marker

    const getMarker = () => { return marker }
    
    return { getMarker }
}

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => { return board }
    
    const setField = (index, marker) => {
        return board[index] = marker
    }

    const getField = (index) => { return board[index] }

    return {
        getBoard, setField, getField
    }
})()

const gameController = (() => {
    const playerX = Player('X')
    const playerO = Player('O')
    let turnCount = 0

    const getCurrentPlayer = () => {
        if (turnCount % 2 === 0) {
            turnCount++
            return playerX.getMarker()
        } else {
            turnCount++
            return playerO.getMarker()
        }
    }

    return {
        getCurrentPlayer
    }
})()

const displayController = (() => {
    const fieldsDOM = document.querySelectorAll('.field')

    const displayBoard = () => {
        for (let i = 0; i < fieldsDOM.length; i++) {
            fieldsDOM[i].textContent = gameBoard.getField(i)
        }
    }

    const placeMarker = (evt) => {
        const index = evt.target.dataset.index
        if (evt.target.textContent !== '') return

        gameBoard.setField(index, gameController.getCurrentPlayer())
        displayBoard()
    }

    fieldsDOM.forEach(field => {
        field.addEventListener('click', placeMarker)
    })

    return {
        displayBoard, placeMarker
    }
})()