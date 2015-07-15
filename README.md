# slide-beacon
Minimum viable prototype for sharing URL's in presentational slides with a [Physical Web](http://github.com/google/physical-web) beacon, making the current [Reveal.js](https://github.com/hakimel/reveal.js/) slide link only a tap away for the audience. 

![](https://raw.githubusercontent.com/dermike/dermike.github.io/master/images/project_slidebeacon.jpg)

### Prerequisites
Physical Web/Eddystone beacons is currently only supported on Mac OSX (Yosemite) and Linux, so you need to either run both presentation and beacon-server on a Mac/Linux machine, or use an external Raspberry Pi with Bluetooth dongle for the server, using NodeJS and websockets.

### Install
Linux needs these dependencies for Bluetooth:

```sh
sudo apt-get install bluetooth bluez-utils libbluetooth-dev
```

```sh
npm install
```

Start listening for websocket connection from your presentation with:

```sh
sudo node server.js
```

Note: sudo only needed on Linux

### Reveal.js plugin
Add as dependency:

```javascript
dependencies: [
  { src: 'plugin/slide-beacon.js' }
]
```

Every section with a data-url attribute will be sent to the beacon server using websockets and broadcast. IP or hostname to the server needs to be provided when presentation is loaded. localhost if presenting from a Mac/Linux machine, or the ip to the Raspberry Pi/other external device.

```html
<section data-url="https://your.url">
```

Note that a Physical Web beacon only can broadcast [URL's up to 18 characters](https://github.com/google/uribeacon#short-urls). Use URL shorteners when needed.

### TODO
* Auto-detect URL's in Reveal.js slides instead of using data-url attribute
* Make stand alone web client to control the beacon
* Make it work with other presentational software
