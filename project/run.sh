#!/bin/bash

# Redirect stdout and stderr to log files
exec > /root/script.log 2> /root/script_error.log

# Move to the project directory and run the run.py script
cd /root/CryptoTickerLed/project/ && ./run.py --led-gpio-mapping=adafruit-hat --led-rows=32 --led-cols=64 --led-slowdown-gpio=4 &

# Move to the app directory and run server.js and start scripts
cd /root/CryptoTickerLed/project/app && /root/.bun/bin/bun run server.js &
cd /root/CryptoTickerLed/project/app && /root/.nvm/versions/node/v20.6.1/bin/node /root/.nvm/versions/node/v20.6.1/bin/serve -s build &

