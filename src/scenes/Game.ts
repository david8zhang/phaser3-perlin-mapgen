import Phaser, { Physics } from 'phaser'
import Perlin from 'phaser3-rex-plugins/plugins/perlin.js'
import { Constants } from '~/utils/Constants'
import { inverseLerp } from '../utils/utils'
import { Player } from './Player'

interface PerlinConfig {
  height: number
  width: number
  scale: number
  octaves: number
  persistence: number
  lacunarity: number
  seed: number
  offset: { x: number; y: number }
}

export default class Game extends Phaser.Scene {
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  public map!: Phaser.Tilemaps.Tilemap
  public offsetX = 0
  public offsetY = 0

  public player?: Player

  public isMoving: boolean = false

  constructor() {
    super('game')
  }

  create(): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.initTilemap()
    this.player = new Player(this, 50, 50)
    this.cameras.main.setBounds(0, 0, 200 * 16, 200 * 16)
    this.cameras.main.startFollow(this.player.sprite, true)
  }

  getTileMap() {
    const offset = { x: this.offsetX, y: this.offsetY }
    const perlinConfig = {
      height: Constants.MAP_HEIGHT,
      width: Constants.MAP_WIDTH,
      scale: Constants.PERLIN_MAP_SCALE,
      octaves: 4,
      persistence: 0.1,
      lacunarity: 1,
      seed: Math.floor(Math.random() * 1000),
      offset,
    }
    const perlinTileGrid = this.generatePerlinTilegrid(perlinConfig)
    const tileMap = this.generateTileMapFromPerlinNoise(perlinTileGrid)
    return tileMap
  }

  generatePerlinTilegrid(config: PerlinConfig) {
    const { seed, scale, height, width, offset } = config
    var noise = new Perlin(seed)
    const tileGrid: number[][] = []
    let maxNoiseHeight = Number.MIN_SAFE_INTEGER
    let minNoiseHeight = Number.MAX_SAFE_INTEGER

    const halfWidth = width / 2
    const halfHeight = height / 2

    for (let i = 0; i < height; i++) {
      tileGrid[i] = new Array(width)
      for (let j = 0; j < width; j++) {
        const x = (i - halfHeight) / scale + offset.x
        const y = (j - halfWidth) / scale + offset.y
        const perlinValue = noise.perlin2(x, y)
        maxNoiseHeight = Math.max(maxNoiseHeight, perlinValue)
        minNoiseHeight = Math.min(minNoiseHeight, perlinValue)
        tileGrid[i][j] = perlinValue
      }
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        tileGrid[i][j] = inverseLerp(minNoiseHeight, maxNoiseHeight, tileGrid[i][j])
      }
    }
    return tileGrid
  }

  generateTileMapFromPerlinNoise(perlinTileMap: number[][]) {
    const map: number[][] = []
    const elevationConfig = Constants.getElevationConfig()

    for (let i = 0; i < perlinTileMap.length; i++) {
      map[i] = new Array(perlinTileMap[0].length)
      for (let j = 0; j < perlinTileMap[0].length; j++) {
        const perlinValue = perlinTileMap[i][j]
        map[i][j] = Constants.getTileCodeForElevation(perlinValue, elevationConfig)
      }
    }
    const isInBounds = (coord: number[]) => {
      const [i, j] = coord
      return i >= 0 && i < perlinTileMap.length && j >= 0 && j < perlinTileMap[0].length
    }

    // Get rid of single tiles
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        const currTile = map[i][j]
        // Check if the tile is an edge or corner tile
        const left = [i, j - 1]
        const right = [i, j + 1]
        const upper = [i - 1, j]
        const lower = [i + 1, j]

        if (isInBounds(upper) && isInBounds(lower) && isInBounds(right)) {
          const upperTile = map[upper[0]][upper[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const rightTile = map[right[0]][right[1]]
          if (upperTile == lowerTile && upperTile == rightTile && upperTile !== currTile) {
            map[i][j] = upperTile
          }
        }
        if (isInBounds(upper) && isInBounds(lower) && isInBounds(left)) {
          const upperTile = map[upper[0]][upper[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const leftTile = map[left[0]][left[1]]
          if (upperTile == lowerTile && upperTile == leftTile && upperTile !== currTile) {
            map[i][j] = upperTile
          }
        }
        if (isInBounds(right) && isInBounds(lower) && isInBounds(left)) {
          const rightTile = map[right[0]][right[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const leftTile = map[left[0]][left[1]]
          if (rightTile == lowerTile && rightTile == leftTile && rightTile !== currTile) {
            map[i][j] = rightTile
          }
        }
        if (isInBounds(right) && isInBounds(upper) && isInBounds(left)) {
          const rightTile = map[right[0]][right[1]]
          const upperTile = map[upper[0]][upper[1]]
          const leftTile = map[left[0]][left[1]]
          if (rightTile == upperTile && rightTile == leftTile && rightTile !== currTile) {
            map[i][j] = rightTile
          }
        }
      }
    }

    let newMap = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(0))
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        const currTile = map[i][j]
        const currPerlinTile = perlinTileMap[i][j]

        // Check if the tile is an edge or corner tile
        const left = [i, j - 1]
        const right = [i, j + 1]
        const upper = [i - 1, j]
        const lower = [i + 1, j]

        newMap[i][j] = map[i][j]

        // Check if upper edge
        if (isInBounds(upper) && isInBounds(lower)) {
          const upperTile = map[upper[0]][upper[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const perlinMapUpper = perlinTileMap[upper[0]][upper[1]]
          const perlinMapLower = perlinTileMap[lower[0]][lower[1]]

          if (
            upperTile !== currTile &&
            (lowerTile == currTile || perlinMapLower > currPerlinTile) &&
            currPerlinTile > perlinMapUpper
          ) {
            newMap[i][j] = Constants.getEdgeTile(currTile, 'upper')
          } else if (
            lowerTile !== currTile &&
            (upperTile == currTile || perlinMapUpper > currPerlinTile) &&
            currPerlinTile > perlinMapLower
          ) {
            newMap[i][j] = Constants.getEdgeTile(currTile, 'lower')
          }
        }

        // Check if right edge
        if (isInBounds(right) && isInBounds(left)) {
          const rightTile = map[right[0]][right[1]]
          const leftTile = map[left[0]][left[1]]
          const perlinMapRight = perlinTileMap[right[0]][right[1]]
          const perlinMapLeft = perlinTileMap[left[0]][left[1]]
          if (
            rightTile !== currTile &&
            (leftTile == currTile || perlinMapLeft > currPerlinTile) &&
            currPerlinTile > perlinMapRight
          ) {
            newMap[i][j] = Constants.getEdgeTile(currTile, 'right')
          } else if (
            leftTile !== currTile &&
            (rightTile == currTile || perlinMapRight > currPerlinTile) &&
            currPerlinTile > perlinMapLeft
          ) {
            newMap[i][j] = Constants.getEdgeTile(currTile, 'left')
          }
        }

        // Check if upper right corner
        if (isInBounds(upper) && isInBounds(right)) {
          const rightTile = map[right[0]][right[1]]
          const upperTile = map[upper[0]][upper[1]]
          const perlinRight = perlinTileMap[right[0]][right[1]]
          const perlinUpper = perlinTileMap[upper[0]][upper[1]]
          if (
            rightTile !== currTile &&
            upperTile !== currTile &&
            currPerlinTile > perlinUpper &&
            currPerlinTile > perlinRight
          ) {
            newMap[i][j] = Constants.getCornerTile(currTile, 'upperRight')
          }
        }

        // Check if lower right corner
        if (isInBounds(lower) && isInBounds(right)) {
          const rightTile = map[right[0]][right[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const perlinRight = perlinTileMap[right[0]][right[1]]
          const perlinLower = perlinTileMap[lower[0]][lower[1]]
          if (
            rightTile !== currTile &&
            lowerTile !== currTile &&
            currPerlinTile > perlinLower &&
            currPerlinTile > perlinRight
          ) {
            newMap[i][j] = Constants.getCornerTile(currTile, 'lowerRight')
          }
        }

        // Check if lower right corner
        if (isInBounds(lower) && isInBounds(left)) {
          const leftTile = map[left[0]][left[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const perlinLeft = perlinTileMap[left[0]][left[1]]
          const perlinLower = perlinTileMap[lower[0]][lower[1]]
          if (
            leftTile !== currTile &&
            lowerTile !== currTile &&
            currPerlinTile > perlinLower &&
            currPerlinTile > perlinLeft
          ) {
            newMap[i][j] = Constants.getCornerTile(currTile, 'lowerLeft')
          }
        }
        // Check if lower right corner
        if (isInBounds(upper) && isInBounds(left)) {
          const leftTile = map[left[0]][left[1]]
          const upperTile = map[upper[0]][upper[1]]
          const perlinLeft = perlinTileMap[left[0]][left[1]]
          const perlinUpper = perlinTileMap[upper[0]][upper[1]]
          if (
            leftTile !== currTile &&
            upperTile !== currTile &&
            currPerlinTile > perlinUpper &&
            currPerlinTile > perlinLeft
          ) {
            newMap[i][j] = Constants.getCornerTile(currTile, 'upperLeft')
          }
        }

        // Check inner corners
        const leftUpperDiag = [i - 1, j - 1]
        const rightUpperDiag = [i - 1, j + 1]
        const leftLowerDiag = [i + 1, j - 1]
        const rightLowerDiag = [i + 1, j + 1]
        if (isInBounds(upper) && isInBounds(right) && isInBounds(rightUpperDiag)) {
          const rightTile = map[right[0]][right[1]]
          const upperTile = map[upper[0]][upper[1]]
          const rightUpperDiagTile = map[rightUpperDiag[0]][rightUpperDiag[1]]
          const perlinRightUpperDiag = perlinTileMap[rightUpperDiag[0]][rightUpperDiag[1]]
          if (
            rightTile == currTile &&
            upperTile == currTile &&
            rightUpperDiagTile !== currTile &&
            currPerlinTile > perlinRightUpperDiag
          ) {
            if (newMap[i][j] == map[i][j]) {
              newMap[i][j] = Constants.getCornerTile(currTile, 'upperInnerRight')
            }
          }
        }

        if (isInBounds(upper) && isInBounds(left) && isInBounds(leftUpperDiag)) {
          const leftTile = map[left[0]][left[1]]
          const upperTile = map[upper[0]][upper[1]]
          const leftUpperDiagTile = map[leftUpperDiag[0]][leftUpperDiag[1]]
          const perlinLeftUpperDiag = perlinTileMap[leftUpperDiag[0]][leftUpperDiag[1]]
          if (
            leftTile == currTile &&
            upperTile == currTile &&
            leftUpperDiagTile !== currTile &&
            currPerlinTile > perlinLeftUpperDiag
          ) {
            if (newMap[i][j] == map[i][j]) {
              newMap[i][j] = Constants.getCornerTile(currTile, 'upperInnerLeft')
            }
          }
        }

        if (isInBounds(lower) && isInBounds(left) && isInBounds(leftLowerDiag)) {
          const leftTile = map[left[0]][left[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const leftLowerDiagTile = map[leftLowerDiag[0]][leftLowerDiag[1]]
          const perlinLeftLowerDiag = perlinTileMap[leftLowerDiag[0]][leftLowerDiag[1]]
          if (
            leftTile == currTile &&
            lowerTile == currTile &&
            leftLowerDiagTile !== currTile &&
            currPerlinTile > perlinLeftLowerDiag
          ) {
            if (newMap[i][j] == map[i][j]) {
              newMap[i][j] = Constants.getCornerTile(currTile, 'lowerInnerLeft')
            }
          }
        }

        if (isInBounds(lower) && isInBounds(right) && isInBounds(rightLowerDiag)) {
          const rightTile = map[right[0]][right[1]]
          const lowerTile = map[lower[0]][lower[1]]
          const rightLowerDiagTile = map[rightLowerDiag[0]][rightLowerDiag[1]]
          const perlinRightLowerDiag = perlinTileMap[rightLowerDiag[0]][rightLowerDiag[1]]
          if (
            rightTile == currTile &&
            lowerTile == currTile &&
            rightLowerDiagTile !== currTile &&
            currPerlinTile > perlinRightLowerDiag
          ) {
            if (newMap[i][j] == map[i][j]) {
              newMap[i][j] = Constants.getCornerTile(currTile, 'lowerInnerRight')
            }
          }
        }
      }
    }

    return newMap
  }

  initTilemap() {
    const sampleMap = this.getTileMap()
    this.map = this.make.tilemap({
      data: sampleMap,
      tileHeight: Constants.TILE_HEIGHT,
      tileWidth: Constants.TILE_WIDTH,
    })
    const tileset = this.map.addTilesetImage('beach-tiles', 'beach-tiles')
    const layer = this.map.createLayer(0, tileset, 0, 0)
  }

  update() {
    this.player?.update(this.cursors)
  }
}
