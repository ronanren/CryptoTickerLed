# CryptoTickerLed

Crypto ticker led to show current price of cryptocurrencies on matrix led. 
The main objective of this project is to reproduce this project selling on 
[Etsy](https://www.etsy.com/listing/1255228529/crypto-ticker-stocks-forex-live-price?ga_order=highest_reviews&ga_search_type=all&ga_view_type=gallery&ga_search_query=crypto+ticker&ref=sc_gallery-1-3&sts=1&plkey=7e51c8858f5ecf6c050067d96408ab1e714a4001%3A1255228529) for almost 200$.


<div>
	<h3>Example of the led matrix:</h3>
	<img src="https://github.com/ronanren/CryptoTickerLed/blob/main/img/example1.jpg?raw=true" width="300">
	<img src="https://github.com/ronanren/CryptoTickerLed/blob/main/img/example2.jpg?raw=true" width="300">
</div>
<div>
	<h3>Example of the web application:</h3>
	<img src="https://github.com/ronanren/CryptoTickerLed/blob/main/img/webapp.png?raw=true" width="300">
	<img src="https://github.com/ronanren/CryptoTickerLed/blob/main/img/webapp-settings.png?raw=true" width="300">
</div>

## Table of contents

- [Hardware](#hardware)
- [Software](#software)
- [Web application](#web-application)
- [Run on startup](#run-on-startup)
- [Troubleshooting](#troubleshooting)

## Hardware

- **Raspberry Pi** (B+ in my case): 50$
- **64x32 RGB LED Matrix - 4mm pitch - HUB75 interface - 256mm x 128mm**: 40$ ([Amazon](https://www.amazon.fr/gp/product/B0B2ZC85KN/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1))
- **5V 4A Power Supply with 5,5mm/2,1mm output**: 20$ ([Amazon](https://www.amazon.fr/gp/product/B07NSSD9RJ/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1))
- **Adafruit RGB Matrix Bonnet for Raspberry Pi**: 15$ ([Adafruit](https://www.adafruit.com/product/3211))

total : ~150$ (with shipping)

To connect the RGB Matrix to the Raspberry Pi, follow the instructions on the Adafruit website: https://learn.adafruit.com/adafruit-rgb-matrix-bonnet-for-raspberry-pi/driving-matrices

## Software

1. Install [dietpi](https://dietpi.com/) on the Raspberry Pi (installation guide: https://dietpi.com/docs/install/)
2. Install Git with ```sudo dietpi-software``` command
3. Git clone this repository with ```git clone --recurse-submodules https://github.com/ronanren/CryptoTickerLed.git```
4. Add sources in /etc/apt/sources.list:
```bash
deb http://deb.debian.org/debian/ buster main
deb-src http://deb.debian.org/debian/ buster main
```
5. Install dependencies:
```bash
sudo apt-get update && sudo apt-get install python2.7-dev python-pillow make build-essential -y
cd matrix
make build-python CC=gcc
sudo make install-python
```

Thanks to these Python bindings, I was able to create this project: https://github.com/hzeller/rpi-rgb-led-matrix/tree/master/bindings/python

To test the matrix led, you need to run:
```bash
cd project
sudo ./run.py --led-gpio-mapping=adafruit-hat --led-rows=32 --led-cols=64 --led-slowdown-gpio=4
```

Workflow of the script:

<img src="https://github.com/ronanren/CryptoTickerLed/blob/main/img/workflow-led.png?raw=true" width="400">

## Web application

I use the [CoinGecko API](https://www.coingecko.com/en/api/documentation) to get the current price of cryptocurrencies and the historical price to display the evolution of the price on the led matrix.

To test the web application and the json server api, you need to run:
```bash
cd project/app 
bun install
bun run server.js & bun run start
```

## Run on startup

In order to run the web application and the script for the led matrix, build the app and install serve:

```bash
npm run build
npm install -g serve
```

After, run ```crontab -e``` and add this line:

```bash
@reboot sleep 20 && /root/CryptoTickerLed/project/run.sh
```

## Troubleshooting

If you have a problem with the led matrix, you can check the logs:

- ```/root/script.log``` : file for output logs
- ```/root/script_error.log``` : file for error logs

