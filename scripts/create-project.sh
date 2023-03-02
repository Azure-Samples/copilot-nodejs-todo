#!/usr/bin/env bash
##############################################################################
# Usage: ./create-samples.sh
# Creates the projects folders
##############################################################################

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

target_folder=packages

cd ..
mkdir $target_folder
cd $target_folder

##############################################################################
# Todo Express app
##############################################################################

echo "Creating gateway-api project..."
npx -y express-generator@4.16.1 --no-view gateway-api
rm -rf gateway-api/public
rm -rf gateway-api/routes/users.js
perl -i -pe "s/3000/4003/" gateway-api/bin/www

echo -e "const express = require('express');
const cookieParser = require('cookie-parser');
const pino = require('pino-http')();

const router = require('./routes/index');

const app = express();

app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

module.exports = app;
" > gateway-api/app.js

echo -e "const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.text('Hello World!');
});

module.exports = router;
" > gateway-api/routes/index.js

echo -e '{
  "name": "gateway-api",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "^1.4.4",
    "debug": "^4.3.4",
    "express": "^4.18.2",
    "pino-http": "^8.2.1"
  }
}
' > gateway-api/package.json

echo -e "
// Workaround from https://stackoverflow.com/a/72416352/599991
require('node:dns').setDefaultResultOrder('ipv4first');
" >> gateway-api/bin/www

##############################################################################
# Website
##############################################################################

echo "Creating website project..."
npx -y create-vite@4.0.0 website --template vanilla
rm -rf website/counter.js
rm -rf website/javascript.svg
echo "" > website/style.css
echo "" > website/main.js
echo -e '<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>

    <script type="module" src="/main.js"></script>
  </body>
</html>
' > website/index.html
