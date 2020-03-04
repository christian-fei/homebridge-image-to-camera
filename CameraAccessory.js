const packageJSON = require('./package.json')
const CameraSource = require('./CameraSource')

module.exports = (hap, Accessory, log) => class CameraAccessory extends Accessory {
  constructor (conf) {
    conf = conf || {}
    var name = conf.name || 'Image to Camera'
    var id = conf.id || name
    var uuid = hap.uuid.generate('homebridge-image-to-camera:' + id)

    //log('setup camera accessory', JSON.stringify(hap.Accessory.Categories))
    super(name, uuid, hap.Accessory.Categories.CAMERA)
    log('setup camera accessory')

    this.getService(hap.Service.AccessoryInformation)
      .setCharacteristic(hap.Characteristic.Manufacturer, 'Christian')
      .setCharacteristic(hap.Characteristic.Model, 'Camera')
      .setCharacteristic(hap.Characteristic.SerialNumber, '42')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, packageJSON.version)

    this.on('identify', function (paired, callback) {
      log('identify')
      callback()
    })

    log('configure camera source')

    this.configureCameraSource(new CameraSource(hap, conf, log))
  }
}
