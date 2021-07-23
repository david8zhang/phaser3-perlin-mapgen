import Phaser, { Physics } from 'phaser'

export default class Game extends Phaser.Scene {
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  public map!: Phaser.Tilemaps.Tilemap

  constructor() {
    super('game')
  }

  create(): void {
    this.initTilemap()
  }

  checkTiles() {
    const map: number[][] = [];
    let tileIndex = 0;
    for (let i = 0; i < 10; i++) {
      map[i] = new Array(10)
      for (let j = 0; j < 10; j++) {
        map[i][j] = tileIndex
        const text = this.add.text(j * 16, i * 16, tileIndex.toString(), {
          fontSize: '10px',
          color: 'black'
        })
        tileIndex++
        text.setDepth(100)
      }
    }
    return map
  }

  initTilemap() {
    const sampleMap = this.checkTiles()
    console.log(sampleMap)
    this.map = this.make.tilemap({
      data: sampleMap,
      tileHeight: 16,
      tileWidth: 16,
    })
    const tileset = this.map.addTilesetImage('beach-tiles', 'beach-tiles')
    const layer = this.map.createLayer(0, tileset, 0, 0)
  }
}
