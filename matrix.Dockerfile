FROM ubuntu:20.04

USER root

RUN apt-get update && apt-get install -y git make build-essential python3 python3-pip python3-distutils python3-dev \
    && $(which python3) -m pip install Pillow \
    && git clone https://github.com/hzeller/rpi-rgb-led-matrix.git \
    && cd rpi-rgb-led-matrix \
    && make build-python PYTHON=$(which python3) \
    && make install-python PYTHON=$(which python3) 

RUN $(which python3) -m pip install requests

WORKDIR /app/project

ENTRYPOINT ["python3", "./run.py", "--led-gpio-mapping=adafruit-hat", "--led-rows=32", "--led-cols=64", "--led-slowdown-gpio=4"]