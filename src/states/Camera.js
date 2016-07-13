/* globals __DEV__ */
import Phaser from 'phaser';
import { setResponsiveWidth } from '../utils';

import $ from 'jquery';
require('webrtc-adapter');

import Settings from './../constraints/Settings.json';

export default class extends Phaser.State {
  init () {
    if ($('video').length < 1) {
      $('#content').append('<video autoplay />');
      $('video').css({
        'width': parseInt($('canvas').innerWidth() * 0.9),
        'height': parseInt($('canvas').innerWidth() * 0.9 * 6 / 8),
        'top': parseInt(($('canvas').innerHeight() - parseInt($('canvas').innerWidth() * 0.9 * 6 / 8)) / 2),
        'left': parseInt($('canvas').css('margin-left')) + parseInt($('canvas').innerWidth() * 0.05),
      });

      $('#content').append('<img id="video-frame" src="' + Settings.uRootDir + '/assets/images/video-frame.png" />');
      $('#video-frame').css({
        'width': parseInt($('canvas').innerWidth()),
        'height': parseInt($('canvas').innerWidth() * 6 / 8),
        'top': parseInt(($('canvas').innerHeight() - parseInt($('canvas').innerWidth() * 6 / 8)) / 2),
        'left': parseInt($('canvas').css('margin-left')),
      });
    }

    this.video = document.querySelector('video');
    // Put variables in global scope to make them available to the browser console.
    this.constraints = window.constraints = {
      audio: false,
      video: true
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);

    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(this.handleError);

  }

  handleSuccess (stream) {
    var videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', this.constraints);
    console.log('Using video device: ' + videoTracks[0].label);
    stream.oninactive = function() {
      console.log('Stream inactive');
    };
    window.stream = stream; // make variable available to browser console
    this.video.srcObject = stream;
  }

  handleError(error) {
    alert(error);
    if (error.name === 'ConstraintNotSatisfiedError') {
      this.errorMsg('The resolution ' + constraints.video.width.exact + 'x' + constraints.video.width.exact + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work.');
    }
    this.errorMsg('getUserMedia error: ' + error.name, error);
  }

  errorMsg(msg, error) {
    alert(msg);
    if (typeof error !== 'undefined') {
      console.log(error);
    }
  }

  preload () {
    this.homeBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'homeBg');
    this.homeBg.anchor.setTo(0.5, 0.5);
    setResponsiveWidth(this.homeBg, 100, this.game.world);
  }

  create () {}

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }
}
