import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import HomeState from './states/Home';
import CameraState from './states/Camera';

class Game extends Phaser.Game {
  constructor () {
    let width = document.documentElement.clientWidth > 414 ? 414 : document.documentElement.clientWidth
    let height = document.documentElement.clientHeight > 736 ? 736 : document.documentElement.clientHeight

    super(width, height, Phaser.AUTO, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Home', HomeState, false);
    this.state.add('Camera', CameraState, false);

    this.state.start('Boot');
  }
}

window.game = new Game()
