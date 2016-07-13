/* globals __DEV__ */
import Phaser from 'phaser'
import { setResponsiveHeight } from '../utils'

export default class extends Phaser.State {
  init () {

  }
  preload () {
    this.homeBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'homeBg');
    this.homeBg.anchor.setTo(0.5, 0.5);
    setResponsiveHeight(this.homeBg, 100, this.game.world);

    this.cameraBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY * 1.5, 'cameraBtn', this.activateCamera, this, 0, 1, 2);
    this.cameraBtn.anchor.setTo(0.5, 0.5);
  }

  create () {}

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }

  activateCamera () {
    setTimeout(function(self) {
      self.state.start('Camera');
    }, 500, this);
  }
}
