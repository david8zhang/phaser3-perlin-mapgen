import Phaser, { Physics } from 'phaser'
import Perlin from 'phaser3-rex-plugins/plugins/perlin.js'
import { inverseLerp } from '../utils/utils'

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
  public static TILE_HEIGHT = 16
  public static TILE_WIDTH = 16

  public static OCEAN_TILE = 38
  public static SHALLOW_OCEAN_TILE = 25
  public static WET_SAND_TILE = 12
  public static DRY_SAND_TIILE = 0
  public static GRASS_TILE = 49

  public mapScale = 100
  public offsetX = 0
  public offsetY = 0

  constructor() {
    super('game')
  }

  create(): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.initTilemap()
  }

  checkTiles() {
    const offset = { x: this.offsetX, y: this.offsetY }
    const perlinConfig = {
      height: 40,
      width: 40,
      scale: this.mapScale,
      octaves: 4,
      persistence: 0.1,
      lacunarity: 1,
      seed: 100,
      offset,
    }
    const perlinTileGrid = this.generatePerlinTilegrid(perlinConfig)
    const tileMap = this.generateTileMapFromPerlinNoise(perlinTileGrid)
    return tileMap
  }

  generatePerlinTilegrid(config: PerlinConfig) {
    const { seed, scale, lacunarity, octaves, persistence, height, width, offset } = config
    var noise = new Perlin(seed)
    const tileGrid: number[][] = []
    let maxNoiseHeight = Number.MIN_SAFE_INTEGER
    let minNoiseHeight = Number.MAX_SAFE_INTEGER

    const prng = new Phaser.Math.RandomDataGenerator([seed.toString()])
    const octaveOffsets: { x: number; y: number }[] = []
    for (let i = 0; i < octaves; i++) {
      const offsetX = prng.between(-100000, 100000) + offset.x
      const offsetY = prng.between(-100000, 100000) + offset.y
      const vector = { x: offsetX, y: offsetY }
      octaveOffsets.push(vector)
    }

    const halfWidth = width / 2
    const halfHeight = height / 2

    for (let i = 0; i < height; i++) {
      tileGrid[i] = new Array(width)
      for (let j = 0; j < width; j++) {
        let amplitude = 1
        let frequency = 1
        let noiseHeight = 0
        for (let k = 0; k < octaves; k++) {
          const x = ((i - halfHeight) / scale) * frequency + octaveOffsets[k].x
          const y = ((j - halfWidth) / scale) * frequency + octaveOffsets[k].y

          const perlinValue = noise.perlin2(x, y)
          noiseHeight += perlinValue * amplitude
          amplitude *= persistence
          frequency *= lacunarity
        }
        if (noiseHeight > maxNoiseHeight) {
          maxNoiseHeight = noiseHeight
        } else if (noiseHeight < minNoiseHeight) {
          minNoiseHeight = noiseHeight
        }
        tileGrid[i][j] = noiseHeight
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
    for (let i = 0; i < perlinTileMap.length; i++) {
      map[i] = new Array(perlinTileMap[0].length)
      for (let j = 0; j < perlinTileMap[0].length; j++) {
        const perlinValue = perlinTileMap[i][j]
        if (perlinValue >= 0 && perlinValue <= 0.35) {
          map[i][j] = Game.OCEAN_TILE
        } else if (perlinValue > 0.35 && perlinValue <= 0.45) {
          map[i][j] = Game.SHALLOW_OCEAN_TILE
        } else if (perlinValue > 0.45 && perlinValue <= 0.55) {
          map[i][j] = Game.WET_SAND_TILE
        } else if (perlinValue > 0.55 && perlinValue <= 0.65) {
          map[i][j] = Game.DRY_SAND_TIILE
        } else if (perlinValue > 0.65 && perlinValue <= 1) {
          map[i][j] = Game.GRASS_TILE
        }
      }
    }
    return map
  }

  initTilemap() {
    const sampleMap = this.checkTiles()
    this.map = this.make.tilemap({
      data: sampleMap,
      tileHeight: 16,
      tileWidth: 16,
    })
    const tileset = this.map.addTilesetImage('beach-tiles', 'beach-tiles')
    const layer = this.map.createLayer(0, tileset, 0, 0)
  }

  update() {
    const leftDown = this.cursors.left?.isDown
    const rightDown = this.cursors.right?.isDown
    const upDown = this.cursors.up?.isDown
    const downDown = this.cursors.down?.isDown
    const spaceDown = this.cursors.space?.isDown
    if (leftDown) {
      this.offsetY -= 0.1
      this.initTilemap()
    }
    if (rightDown) {
      this.offsetY += 0.1
      this.initTilemap()
    }
    if (downDown) {
      this.offsetX += 0.1
      this.initTilemap()
    }
    if (upDown) {
      this.offsetX -= 0.1
      this.initTilemap()
    }
    if (spaceDown) {
      this.mapScale -= 0.2
      this.initTilemap()
    }
  }
}
