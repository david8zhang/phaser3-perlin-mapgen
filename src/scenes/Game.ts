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

  constructor() {
    super('game')
  }

  create(): void {
    this.initTilemap()
  }

  checkTiles() {
    const map: number[][] = []
    let tileIndex = 0
    for (let i = 0; i < 10; i++) {
      map[i] = new Array(10)
      for (let j = 0; j < 10; j++) {
        map[i][j] = tileIndex
        const text = this.add.text(j * 16, i * 16, tileIndex.toString(), {
          fontSize: '10px',
          color: 'black',
        })
        tileIndex++
        text.setDepth(100)
      }
    }
    const offset = { x: 0, y: 0 }
    const perlinConfig = {
      height: 100,
      width: 100,
      scale: 10,
      octaves: 4,
      persistence: 0.5,
      lacunarity: 2,
      seed: 100,
      offset,
    }
    const perlinTileGrid = this.generatePerlinTilegrid(perlinConfig)
    console.log(perlinTileGrid)
    return map
  }

  generatePerlinTilegrid(config: PerlinConfig) {
    const { seed, scale, lacunarity, octaves, persistence, height, width, offset } = config
    var noise = new Perlin(seed)
    const tileGrid: number[][] = []
    let maxNoiseHeight = Number.MIN_SAFE_INTEGER
    let minNoiseHeight = Number.MAX_SAFE_INTEGER

    const prng = new Phaser.Math.RandomDataGenerator()
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
          console.log(perlinValue)
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

    console.log(maxNoiseHeight)
    console.log(minNoiseHeight)
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const val = inverseLerp(minNoiseHeight, maxNoiseHeight, tileGrid[i][j])
        // tileGrid[i][j] = inverseLerp(minNoiseHeight, maxNoiseHeight, tileGrid[i][j])
      }
    }
    return tileGrid
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
}
