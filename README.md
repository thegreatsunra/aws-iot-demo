# aws-iot-demo

> Lightweight demo of AWS IoT messaging

## Getting started

### Prerequisites

1) Install [node](https://nodejs.org/en/)
2) Install [git](https://git-scm.com/downloads)
3) Install [yarn](https://yarnpkg.com/lang/en/docs/install/)

### Set up project

1) Clone this repo
```bash
git clone https://github.com/thegreatsunra/aws-iot-demo.git
cd aws-iot-demo
```

2) Install dependencies
```bash
yarn
```

## Set up AWS IoT

1) Sign up for AWS
2) Go to the AWS IoT home screen
3) Go to your Registry of Things
4) Create a new Thing
5) Name your Thing

### Create an AWD IoT "Thing" certificate

1) Choose "Security" from the menu
2) Click "Create Certificate"
3) Download "A certificate for this thing"
4) Download "A public key"
5) Download "A private key"
6) Download "A root CA for AWS IoT from Symantec"
7) Click the "Activate" button
8) Click "Done"

### Associate certificates with your project

1) Move all the files you downloaded (the certificate, public key, private key, and root CA) from AWS IoT into the `cert/` folder of this project, and rename the files to `certificate.pem.crt`, `public.pem.key`, `private.pem.key`, and `root-CA.pem`

2) Open `config.original.js` and find the `host` value in the config object

3) Update the value for `host` to your "custom endpoint" on AWS IoT. You can find this value by clicking the "Settings" menu option on your AWS IoT home screen. It should look something like `xxxxxxxxxxxxxx.iot.xx-xxxx-x.amazonaws.com`

4) Save `config.original.js` as a new file named `config.js`

### Run the demo

1) Run `npm start`
2) Go to your AWS IoT home screen and click the "Test" menu option
3) Under "Subscribe to a topic" enter `deviceMessages_topic` as your "Subscription topic"
4) Click "Subscribe to topic"
5) Click the "deviceMessages_topic" menu item that appears beneath "Subscribe to a topic" in the left menu
6) You should see messages streaming in!

### Package the demo

You can package the demo into a single executable file using Zeit's [pkg](https://github.com/zeit/pkg) utility.

1) Install pkg globally by running `npm install -g pkg`
2) In your `aws-iot-demo` folder, run `npm run pkg` to generate executables for macOS, Windows, and Linux
3) Double-click on the appropriate executable to run it in a command prompt

### TODO: Add instructions for adding DynamoDB rule, and creating DynamoDB database and indexes

### TODO: Add instructions for creating AWS API Gateway resources, methods, child resources, body mapping templates, enabling CORS, deployments, stages, etc.

## License

The MIT License (MIT)

Copyright (c) 2017 Dane Petersen
