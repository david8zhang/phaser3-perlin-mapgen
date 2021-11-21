import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // Tiles
    this.load.image('beach-tiles', 'tiles/beach-tiles.png')
    this.load.image('panel', 'ui/grey_panel.png')
    this.load.image('tent-tiles', 'tiles/tent-tiles.png')
    this.load.image('player', 'character/player.png')
    this.load.tilemapTiledJSON('starter-island', 'tiles/starter-island.json')
    this.load.tilemapTiledJSON('starter-island-2', 'tiles/starter-island-2.json')
  }
  create() {
    this.scene.start('game')
  }
}
