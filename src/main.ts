import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import PerlinPlugin from 'phaser3-rex-plugins/plugins/perlin-plugin.js';

import Game from './scenes/Game'
import Preloader from './scenes/Preloader'

const config: any = {
  antialias: false,
  type: Phaser.AUTO,
  width: 600,
  height: 375,
  parent: 'phaser',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  plugins: {
    global: [NineSlicePlugin.DefaultCfg, {
      key: 'rexPerlin',
      plugin: PerlinPlugin,
      start: true
    }],
  },
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: [Preloader, Game],
}

export default new Phaser.Game(config)
