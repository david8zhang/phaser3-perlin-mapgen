import { Constants } from '~/utils/Constants'
import Game from './Game'

export class Player {
  public game: Game
  public sprite: Phaser.Physics.Arcade.Sprite
  constructor(game: Game, x: number, y: number) {
    this.game = game
    this.sprite = game.physics.add.sprite(x, y, 'player')
    this.game.physics.world.enableBody(this.sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.game.physics.add.collider(this.sprite, this.game.layerMapping['Ocean'])
  }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    const leftDown = cursors.left.isDown
    const rightDown = cursors.right.isDown
    const upDown = cursors.up.isDown
    const downDown = cursors.down.isDown

    const speed = Constants.PLAYER_SPEED

    if (!leftDown && !rightDown && !upDown && !downDown) {
      this.sprite.setVelocity(0, 0)
    }

    if (leftDown) {
      this.sprite.setVelocity(-speed, 0)
    }
    if (rightDown) {
      this.sprite.setVelocity(speed, 0)
    }
    if (upDown) {
      this.sprite.setVelocity(0, -speed)
    }
    if (downDown) {
      this.sprite.setVelocity(0, speed)
    }
  }
}
