# slide-beacon
Minimum viable prototype for sharing URL's in presentational slides with a [Physical Web](http://github.com/google/physical-web) beacon, making the current [Reveal.js](https://github.com/hakimel/reveal.js/) slide link only a tap away for the audience. 

![](https://raw.githubusercontent.com/dermike/dermike.github.io/master/images/project_slidebeacon.jpg)

### Prerequisites
This prototype consists of two parts:
* `server.js`, a Node.js app currently only working on Mac OSX (Yosemite) and Linux, listening for incoming URLs over websockets to broadcast using Bluetooth, making them instantly available for the audience via [Physical Web](http://physical-web.org). Needs to run in your terminal or on an external Raspberry Pi while presenting to be able to create the actual Eddystone URL beacon. Can also be used together with this [link sharing Eddystone bookmarklet](https://github.com/dermike/eddystone-bookmarklet).
* `revealjs-plugin/slide-beacon.js`, plugin for [Reveal.js](https://github.com/hakimel/reveal.js/) HTML presentational framework, that sends marked up URLs in your slides over websockets to the server part for broadcast.

**Note: There's also the option of using this desktop app for OSX found here: [electron-slide-beacon](https://github.com/dermike/electron-slide-beacon).**

### Install
Linux needs these dependencies for Bluetooth:

```sh
sudo apt-get install bluetooth bluez-utils libbluetooth-dev
```

On a Mac you need [Xcode](https://developer.apple.com/xcode/download/) and its `Command Line Tools` to build the Bluetooth dependencies. You can find this under the menu `Xcode -> Preferences -> Downloads`

Install dependencies:

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
