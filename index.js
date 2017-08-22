/*
 * Copyright 2010-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// node.js deps

// npm deps

// app deps
const deviceModule = require('aws-iot-device-sdk').device
const cmdLineProcess = require('aws-iot-device-sdk/examples/lib/cmdline')

// begin module

function processTest (args) {
  //
  // The device module exports an MQTT instance, which will attempt
  // to connect to the AWS IoT endpoint configured in the arguments.
  // Once connected, it will emit events which our application can
  // handle.
  //
  const device = deviceModule({
    keyPath: args.privateKey,
    certPath: args.clientCert,
    caPath: args.caCert,
    clientId: args.clientId,
    region: args.region,
    baseReconnectTimeMs: args.baseReconnectTimeMs,
    keepalive: args.keepAlive,
    protocol: args.Protocol,
    port: args.Port,
    host: args.Host,
    debug: args.Debug
  })

  const minimumDelay = 3000
  const topic = 'deviceMessages_topic'
  let timeout // eslint-disable-line no-unused-vars
  let count = 0

  if ((Math.max(args.delay, minimumDelay)) !== args.delay) {
    console.log('substituting ' + minimumDelay + 'ms delay for ' + args.delay + 'ms...')
  }

  timeout = setInterval(() => {
    count++
    let countIsPrime = isPrime(count)
    let now = new Date()
    let timestamp = now.toISOString()
    let message = {
      at: timestamp,
      count: count,
      topic: topic,
      lat: 44.986656,
      lng: -93.258133,
      countIsPrime
    }
    device.publish(topic, JSON.stringify(message))
    console.log('AWS IoT - device.publish: \n', JSON.stringify(message), '\n')
  }, Math.max(args.delay, minimumDelay)) // clip to minimum
  device
    .on('connect', () => {
      console.log('AWS IoT - device.connect')
    })
  device
    .on('close', () => {
      console.log('AWS IoT - device.close')
    })
  device
    .on('reconnect', () => {
      console.log('AWS IoT - device.reconnect')
    })
  device
    .on('offline', () => {
      console.log('AWS IoT - device.offline')
    })
  device
    .on('error', (error) => {
      console.log('AWS IoT - device.error', error)
    })
  device
    .on('message', (topic, payload) => {
      console.log('AWS IoT - device.message', topic, payload.toString())
    })
}

function isPrime (num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false
  return num !== 1
}

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min
}

function getRandomString (length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''
  for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
  return text
}

module.exports = cmdLineProcess

if (require.main === module) {
  cmdLineProcess('connect to the AWS IoT service and publish/subscribe to topics using MQTT',
    process.argv.slice(2), processTest)
}
