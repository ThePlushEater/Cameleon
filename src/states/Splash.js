import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import { setResponsiveHeight } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBg.anchor.setTo(0.5, 0.5);
    setResponsiveHeight(this.loaderBg, 100, this.game.world);
    // let width = window.game.scale.width;
    // let height = window.game.scale.height;

    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY * 1.25, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/cameloen.png');
  }

  create () {
    setTimeout(function(self) {
      self.state.start('Game');
    }, 2500, this);
  }
}
