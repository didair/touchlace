# Touchlace
A Lovelace (Home Assistant) alternative written in ReactJS. Mainly designed to run on tablets. Configure a beautiful dashboard without writing a single line of YAML!

![Touchlace preview on an wall mounted iPad](https://github.com/didair/touchlace/blob/main/docs/preview1.jpg)

## Features
* A beautiful interface!
* Configurable rooms
* 120+ icons for your devices
* Real time device updates using web sockets
* Basic configuration of all cards
* Excellent Sonos integration with grouping and media browser (WIP)
* Set up your entire dashboard with GUI - No YAML required!

### ... Also worth mentioning
* ✓ All data lives on your device
* ✓ Communicates directly with your Home Assistant server

### Supported entities
- [x] Light
- [x] Switch
- [x] Cover (Blinds etc)
- [x] Scene
- [x] Sensor
- [x] Binary sensor
- [x] Vacuum (Beta, currently in development)
- [ ] Person
- [x] Media player

### Note
Since all data (including preferences and authentication) lives locally on your devices it will not sync between app/browsers. Please be careful to not clear the cache/localstorage once all settings are made.

#### Adding backgrounds on entities
Add images under "My Media" in hass. Before uploading them it is highly recommended to compress them using [imagecompressor.com](https://imagecompressor.com/) or similar.

It should be enough if the images are a resolution of 300x300px. Note that this feature can reduce the lifespan of SD cards since it adds additional reads and writes. My tip is to keep all images as small as possible.

## Installation
### Expose Home Assistant
To access Touchlace via the production env (touchlace.aekstrom.me) you need to expose your Home Assistant installation to the internet **with** SSL encryption. The easiest way to accomplish this is to get [Home Assistant Cloud](https://www.nabucasa.com/) or using the [DuckDNS addon and Let's Encrypt](https://www.home-assistant.io/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/).

### http configuration
Add this to your configuration.yaml:

```
http:
  cors_allowed_origins:
    - https://touchlace.aekstrom.me
```


![Touchlace preview](https://github.com/didair/touchlace/blob/main/docs/preview2.jpg)