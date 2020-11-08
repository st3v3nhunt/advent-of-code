require('draftlog').into(console)

const { Comp } = require('../lib/intcodeComputerClass')

class Cabinet {
  constructor (intcode, freePlay = false) {
    this.score = 0
    this.moveRecord = []
    this.screen = []
    this.drafts = []
    let program
    if (freePlay) {
      const instructions = intcode.split(',')
      instructions[0] = 2
      program = instructions.join(',')
    } else {
      program = intcode
    }
    this.comp = new Comp(program).runner()
    const initialState = this.comp.next().value.map(Number)
    this.result = this.updateState(initialState)
  }

  static convertToTile (tile) {
    let content
    switch (tile) {
      case 0:
        content = ' '
        break
      case 1:
        content = '|'
        break
      case 2:
        content = '#'
        break
      case 3:
        content = '-'
        break
      case 4:
        content = 'O'
        break
      default:
        throw new Error(`Unknown tile type: '${tile}'.`)
    }
    return content
  }

  get remainingBlocks () {
    return this.screen.flat().reduce((acc, cur) => {
      if (cur === '#') {
        return acc + 1
      }
      return acc
    }, 0)
  }

  updateScreen () {
    for (let i = 0; i < this.drafts.length; i++) {
      this.drafts[i](this.screen[i].join(''))
    }
  }

  drawScreen () {
    this.updateScreen()
  }

  updateState (state) {
    while (state.length) {
      const x = state.shift()
      const y = state.shift()
      const tile = state.shift()

      if (tile === 4) {
        this.ballPointer = [y, x]
      }
      if (tile === 3) {
        this.paddlePointer = [y, x]
      }

      if (x === -1 && y === 0) {
        this.score = tile
        this.screen[0][50] = `Score: ${tile}`
        this.screen[1][50] = `Moves taken: ${this.moveRecord.length}`
        this.screen[2][50] = `Blocks left: ${this.remainingBlocks}`
      } else {
        if (!this.screen[y]) {
          this.screen[y] = []
          this.drafts[y] = console.draft()
        }
        const content = Cabinet.convertToTile(tile)
        this.screen[y][x] = content
      }
    }
  }

  calcMove () {
    let move = 0
    if (this.ballPointer[1] > this.paddlePointer[1]) {
      move = 1
    } else if (this.ballPointer[1] < this.paddlePointer[1]) {
      move = -1
    }
    return move
  }

  play (draw = true) {
    let result = {}
    while (!result.done) {
      const move = this.calcMove()
      result = this.comp.next(move)
      this.moveRecord.push(move)

      const stateUpdates = result.value.map(Number)
      this.updateState(stateUpdates)

      if (result.done) { this.drawScreen() }
      if (draw) { this.drawScreen() }
    }

    return result
  }
}

module.exports = Cabinet
