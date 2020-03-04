# homebridge-image-to-camera

**Homebridge plugin for displaying an Image as Camera**

<!-- [![NPM version](https://badge.fury.io/js/homebridge-image-to-camera.svg)](https://npmjs.org/package/homebridge-image-to-camera) [![Dependency Status](https://christian-dm.org/christian-fei/homebridge-image-to-camera.svg)](https://christian-dm.org/christian-fei/homebridge-image-to-camera) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Downloads](https://img.shields.io/npm/dm/homebridge-image-to-camera.svg)](https://npmjs.org/package/homebridge-image-to-camera) -->

# Installation

Make sure you have homebridge installed.

1. Install this plugin using: `sudo npm install -g homebridge-image-to-camera`
2. Update your Homebridge `config.json` using the sample below (append in the block 'platforms' not 'accessories')


# Configuration

Update your config similar to this:
```json
 "platforms": [
      {
         "platform": "image-camera",
         "images": [
            {
               "name": "Image 1",
               "path": "/path/to/image.jpg"
            }
         ]
      }
   ]
```

**You can add multiple cameras!**

## Config file

Take a look at the <a href="config.example.json">example config.json</a>

Fields:

* `name` name of the camera (required)
* `path` the local path of the image (required)

# Usage

In some cases, the camera is not visible in Home-App:
* Press + on top right corner in Home-App
* Press `Add device`
* Press `Code missing`
* Select Camera

Please note that the image will only be displayed as the camera preview. Image stream is not supported.