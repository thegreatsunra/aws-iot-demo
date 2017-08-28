const path = require('path')
const isUndefined = require('./lib/is-undefined')

let clientIdDefault
if (!isUndefined(process.env.USER)) {
  clientIdDefault = process.env.USER.concat(Math.floor((Math.random() * 100000) + 1))
} else {
  clientIdDefault = 'nouser' + (Math.floor((Math.random() * 100000) + 1))
}

module.exports = {
  devices: [
    'y4xzu',
    '7fpfg',
    'bwpz2',
    'mngnd',
    'akss7'
  ],
  keyPath: path.join(__dirname, './cert/private.pem.key'),
  certPath: path.join(__dirname, './cert/certificate.pem.crt'),
  caPath: path.join(__dirname, './cert/root-CA.pem'),
  clientId: clientIdDefault,
  host: 'xxxxxxxxxxxxxx.iot.xx-xxxx-x.amazonaws.com',
  minimumDelay: 3000,
  count: 0,
  topic: 'deviceMessages_topic',
  lat: 44.986656,
  lng: -93.258133
}
