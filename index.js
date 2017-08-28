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
const path = require('path')

// app deps
const config = require('./config')
const iotDevice = require('aws-iot-device-sdk').device

// begin module
function process () {

const device = iotDevice({
  keyPath: config.keyPath,
  certPath: config.certPath,
  caPath: config.caPath,
  clientId: config.clientId,
  host: config.host
 })

  let timeout // eslint-disable-line no-unused-vars
  let count = config.count
  let topic = config.topic
  let lat = config.lat
  let lng = config.lng
  let minimumDelay = config.minimumDelay
  let devices = config.devices
  timeout = setInterval(() => {
    count++
    let countIsPrime = isPrime(count)
    let now = new Date()
    let at = now.toISOString()
    let message = {
      id: getRandomString(8),
      deviceId: devices[getRandomNumber(0, 4)],
      at,
      count,
      topic,
      lat,
      lng,
      countIsPrime
    }
    device.publish(topic, JSON.stringify(message))
    console.log('AWS IoT - device.publish: \n', JSON.stringify(message), '\n')
  }, minimumDelay)
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

process()
