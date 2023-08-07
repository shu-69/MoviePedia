
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-youtube-video-player.YoutubeVideoPlayer",
          "file": "plugins/cordova-plugin-youtube-video-player/plugins/com.bunkerpalace.cordova.YoutubeVideoPlayer/www/YoutubeVideoPlayer.js",
          "pluginId": "cordova-plugin-youtube-video-player",
        "clobbers": [
          "YoutubeVideoPlayer"
        ]
        },
      {
          "id": "cordova-plugin-speechrecognition.SpeechRecognition",
          "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
          "pluginId": "cordova-plugin-speechrecognition",
        "merges": [
          "window.plugins.speechRecognition"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-speechrecognition": "1.1.2",
      "cordova-plugin-youtube-video-player": "2.4.0"
    };
    // BOTTOM OF METADATA
    });
    