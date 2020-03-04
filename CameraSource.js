const ip = require('ip')
const getImage = require('./get-image')

module.exports = CameraSource

function CameraSource (hap, conf, log) {
  this.hap = hap
  this.conf = conf
  this.log = log

  this.services = []
  this.streamControllers = []

  const options = {
    proxy: false, // Requires RTP/RTCP MUX Proxy
    disable_audio_proxy: false, // If proxy = true, you can opt out audio proxy via this
    srtp: true, // Supports SRTP AES_CM_128_HMAC_SHA1_80 encryption
    video: {
      resolutions: [
        [1920, 1080, 30], // Width, Height, framerate
        [320, 240, 15], // Apple Watch requires this configuration
        [1280, 960, 30],
        [1280, 720, 30],
        [1024, 768, 30],
        [640, 480, 30],
        [640, 360, 30],
        [480, 360, 30],
        [480, 270, 30],
        [320, 240, 30],
        [320, 180, 30]
      ],
      codec: {
        profiles: [0, 1, 2], // Enum, please refer StreamController.VideoCodecParamProfileIDTypes
        levels: [0, 1, 2] // Enum, please refer StreamController.VideoCodecParamLevelTypes
      }
    },
    audio: {
      comfort_noise: false,
      codecs: [
        {
          type: 'OPUS', // Audio Codec
          samplerate: 24 // 8, 16, 24 KHz
        },
        {
          type: 'AAC-eld',
          samplerate: 16
        }
      ]
    }
  }
  this._createStreamControllers(2, options)
}

CameraSource.prototype.handleSnapshotRequest = function (request, callback) {
  const log = this.log
  log('CameraSource handleSnapshotRequest', this.conf)

  return getImage(this.conf.path)
    .then(img => {
      log('Got image', img)
      callback(null, img)
    })
    .catch(reason => {
      log(reason)
      callback(reason)
    })
}

CameraSource.prototype.createCameraControlService = function () {
  this.log('CameraSource createCameraControlService', this.conf)
  const controlService = new this.hap.Service.CameraControl()
  this.services.push(controlService)
}

CameraSource.prototype.handleStreamRequest = function (request) {
  this.log('CameraSource handleStreamRequest', this.conf)
}

CameraSource.prototype.prepareStream = function (request, callback) {
  this.log('CameraSource prepareStream', this.conf)

  const sessionInfo = {}

  sessionInfo.address = request.targetAddress

  const response = {}

  const currentAddress = ip.address()
  const addressResp = {
    address: currentAddress
  }

  if (ip.isV4Format(currentAddress)) {
    addressResp.type = 'v4'
  } else {
    addressResp.type = 'v6'
  }

  response.address = addressResp

  this.log('CameraSource prepareStream', response)

  callback(response)
}
CameraSource.prototype.handleCloseConnection = function (connectionID) {
  this.log('CameraSource handleCloseConnection', this.conf)
}
CameraSource.prototype._createStreamControllers = function (maxStreams, options) {
  this.log('CameraSource _createStreamControllers', this.conf)

  let self = this
  for (let i = 0; i < maxStreams; i += 1) {
    var streamController = new this.hap.StreamController(i, options, self)
    self.services.push(streamController.service)
    self.streamControllers.push(streamController)
  }
}
