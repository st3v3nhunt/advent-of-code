require('draftlog').into(console)
const { Comp } = require('../lib/intcodeComputerClass')

class RepairDroid {
  constructor (input, moveStrategy, mazeSize = 100) {
    this.comp = new Comp(input).runner()
    this.startPos = Math.ceil(mazeSize / 2)
    this.moveStrategy = moveStrategy
    this.statusLog = console.draft();
    [this.maze, this.drafts] = RepairDroid.createMaze(mazeSize)
    console.log(`Maze drawing will be ${mazeSize}^2. Starting position will be [${this.startPos}, ${this.startPos}]`)
  }

  static createMaze (mazeSize) {
    const drafts = []
    const maze = Array(mazeSize)
    for (let i = 0; i < mazeSize; i++) {
      maze[i] = Array(mazeSize).fill(' ')
      drafts.push(console.draft())
    }
    // add border
    maze[0].fill('-')
    maze[mazeSize - 1].fill('-')
    maze.forEach((x) => {
      x[0] = '|'
      x[mazeSize - 1] = '|'
    })
    return [maze, drafts]
  }

  updateTargetPos () {
    const [y, x] = this.pos

    switch (this.move) {
      case 1:
        this.targetPos = [y - 1, x]
        break
      case 2:
        this.targetPos = [y + 1, x]
        break
      case 3:
        this.targetPos = [y, x - 1]
        break
      case 4:
        this.targetPos = [y, x + 1]
        break
      default:
        throw new Error(`Unknown move type: ${this.move}`)
    }
  }

  changeMoveFail () {
    this.statusLog('Wall hit')
    this.previousMove = this.move
    this.updateMaze('#')
    this.moveSuccess = false

    if (this.moveStrategy === 'left') {
      this.goRight()
    } else if (this.moveStrategy === 'right') {
      this.goLeft()
    }
  }

  moveSuccessUpdates () {
    if (this.moveStrategy === 'left') {
      this.goLeft()
    } else if (this.moveStrategy === 'right') {
      this.goRight()
    }
  }

  goLeft () {
    switch (this.move) {
      case 1:
        this.move = 3
        break
      case 2:
        this.move = 4
        break
      case 3:
        this.move = 2
        break
      case 4:
        this.move = 1
        break
      default:
        throw new Error(`Unknown move type: ${this.move}`)
    }
    this.updateDroidInMaze()
  }

  goRight () {
    switch (this.move) {
      case 1:
        this.move = 4
        break
      case 2:
        this.move = 3
        break
      case 3:
        this.move = 1
        break
      case 4:
        this.move = 2
        break
      default:
        throw new Error(`Unknown move type: ${this.move}`)
    }
    this.updateDroidInMaze()
  }

  getDir () {
    switch (this.move) {
      case 1:
        return '^'
      case 2:
        return 'v'
      case 3:
        return '<'
      case 4:
        return '>'
      default:
        throw new Error(`Unknown move type: ${this.move}`)
    }
  }

  drawMaze () {
    this.drafts.forEach((x, i) => {
      if (i === this.startPos) {
        this.maze[i][this.startPos] = 'X'
        x(this.maze[i].join(''))
      } else {
        x(this.maze[i].join(''))
      }
    })
  }

  updateDroidInMaze () {
    this.maze[this.pos[0]][this.pos[1]] = this.getDir()
  }

  updateMaze (block) {
    this.maze[this.targetPos[0]][this.targetPos[1]] = block
  }

  map () {
    let result = this.comp.next()
    const moveRecord = []
    const successRecord = []
    let complete = false
    this.pos = [this.startPos, this.startPos]
    this.move = 1
    this.previousMove = this.move
    this.moveSuccess = false
    while (!complete) {
      // this.drawMaze(); // don't do this each iteration for real
      moveRecord.push(this.move.toString())
      this.updateTargetPos()
      result = this.comp.next(this.move)

      switch (Number(result.value)) {
        case 0:
          this.changeMoveFail()
          break
        case 1:
          this.statusLog('Move success')
          successRecord.push(this.targetPos.toString())
          this.updateMaze(this.getDir()) // Update droid location with direction
          this.maze[this.pos[0]][this.pos[1]] = '.'
          this.pos = this.targetPos
          if (this.moveSuccess) {
            this.moveSuccessUpdates()
          } else {
            this.move = this.previousMove
            this.moveSuccess = true
          }
          break
        case 2:
          this.statusLog(`Oxygen has been found at ${this.pos}!`)
          this.updateMaze('O')
          successRecord.push(this.targetPos.toString())
          this.previousMove = this.move
          this.moveSuccess = false
          this.drawMaze()
          complete = true
          break
        default:
          throw new Error('Unknown response')
      }
    }
    const temp = {}
    successRecord.forEach((x) => {
      if (temp[x]) {
        temp[x] += 1
      } else {
        temp[x] = 1
      }
    })
    const moves = []
    Object.entries(temp).forEach(([k, v]) => {
      if (v === 1) {
        moves.push(k)
      }
    })
    return moves.length
  }
}

module.exports = RepairDroid
