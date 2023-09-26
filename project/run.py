#!/usr/bin/env python
from samplebase import SampleBase
from rgbmatrix import graphics
import time, random, os, json, socket
from coingecko_api import get_crypto_data

class Run(SampleBase):
    def __init__(self, *args, **kwargs):
        super(Run, self).__init__(*args, **kwargs)
        self.font = graphics.Font()
        self.font.LoadFont("fonts/6x12.bdf")
        self.smallFont = graphics.Font()
        self.smallFont.LoadFont("fonts/4x6.bdf")

        self.whiteColor = graphics.Color(255, 255, 255)
        self.redColor = graphics.Color(40, 0, 0)
        self.highRedColor = graphics.Color(255, 0, 0)
        self.greenColor = graphics.Color(0, 40, 0)
        self.highGreenColor = graphics.Color(0, 240, 0)
        self.blue = graphics.Color(53, 0, 245)

        self.json_file_path = "app/public/config_displays.json"

    def get_position_right(self, size_canvas, text):
        position = size_canvas
        for character in text:
            if character == '.':
                position -= 3
            elif character in ['1', '-']:
                position -= 5
            else:
                position -= 6
        return position

    def get_color_for_percent(self, percent, level):
        if percent.startswith("+") or percent == "0.00":
            if level == "low":
                return self.greenColor
            else:
                return self.highGreenColor
        elif percent.startswith("-"):
            if level == "low":
                return self.redColor
            else:
                return self.highRedColor
        else:
            return self.whiteColor

    def fetch_type_display(self, display):
        try:
            with open(self.json_file_path, 'r') as file:
                json_data = json.load(file)
                type_display = json_data['displays'][display]['type']
                interval = json_data['displays'][display]['interval']
                displays = len(json_data['displays'])

		    # settings
            brightness = json_data['settings']['brightness']
            self.matrix.brightness = brightness
            return type_display, interval, displays
        except:
            return None, 10, 1

    def show_type_of_display(self, offscreen_canvas, type_display, display):
        if type_display == "crypto":
            ticker, granularity, price, percent, chart = self.fetch_crypto_data(display)
            self.show_crypto_data(offscreen_canvas, ticker, granularity, price, percent, chart)
        if type_display == None:
            ip = self.fetch_ip_data()
            self.show_ip_data(offscreen_canvas, ip)

    def fetch_crypto_data(self, display):
        with open(self.json_file_path, 'r') as file:
            json_data = json.load(file)
            id_crypto = json_data['displays'][display]['id']
            ticker = json_data['displays'][display]['symbol']
            granularity = json_data['displays'][display]['granularity']

        data = get_crypto_data(id_crypto, granularity)
        percent = "{:.2f}".format(data['price_change_percentage_24h'])
        if float(percent) > 0: percent = "+" + percent
        percent += "%"
        price = "$" + str(data['current_price'])
        return ticker, granularity, price, percent, data['chart']

    def show_crypto_data(self, offscreen_canvas, ticker, granularity, price, percent, chart):
        offscreen_canvas.Clear()
        graphics.DrawText(offscreen_canvas, self.font, 1, 8, self.whiteColor, ticker)
        graphics.DrawText(offscreen_canvas, self.font, self.get_position_right(offscreen_canvas.width, percent), 8, self.get_color_for_percent(percent, "high"), percent)

        graphics.DrawText(offscreen_canvas, self.font, 1, 16, self.whiteColor, price)
        graphics.DrawText(offscreen_canvas, self.font, self.get_position_right(offscreen_canvas.width, granularity), 16, self.get_color_for_percent(percent, "high"), granularity)

        for i in range(0, 64):
            nbr = 31 - chart[i]
            graphics.DrawLine(offscreen_canvas, i, 31, i, nbr, self.get_color_for_percent(percent, "low"))
            if (self.get_color_for_percent(percent, "low") == self.greenColor):
                offscreen_canvas.SetPixel(i, nbr, self.highGreenColor.red, self.highGreenColor.green, self.highGreenColor.blue)
            else:
                offscreen_canvas.SetPixel(i, nbr, self.highRedColor.red, self.highRedColor.green, self.highRedColor.blue)
        self.matrix.SwapOnVSync(offscreen_canvas)

    def fetch_ip_data(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.1)
        s.connect(('10.255.255.255', 1))
        local_ip = s.getsockname()[0]
        return local_ip

    def show_ip_data(self, offscreen_canvas, ip):
        offscreen_canvas.Clear()
        graphics.DrawText(offscreen_canvas, self.smallFont, self.get_position_right(offscreen_canvas.width, ip), 16, self.blue, ip)
        graphics.DrawText(offscreen_canvas, self.smallFont, self.get_position_right(offscreen_canvas.width, ":3000"), 26, self.blue, ":3000")
        self.matrix.SwapOnVSync(offscreen_canvas)

    def run(self):
        offscreen_canvas = self.matrix.CreateFrameCanvas()

        last_modification_time = None
        last_display_update = time.time()
        display = 0
        type_display, interval, displays = self.fetch_type_display(display)
        self.show_type_of_display(offscreen_canvas, type_display, display)

        while True:
            current_modification_time = os.path.getmtime(self.json_file_path)
            if current_modification_time != last_modification_time:
                display = 0
                last_display_update = time.time()
                type_display, interval, displays = self.fetch_type_display(display)
                self.show_type_of_display(offscreen_canvas, type_display, display)
                last_modification_time = current_modification_time
            elif time.time() - last_display_update >= interval:
                display = (display + 1) % displays
                type_display, interval, displays = self.fetch_type_display(display)
                self.show_type_of_display(offscreen_canvas, type_display, display)
                last_display_update = time.time()

            time.sleep(1)

if __name__ == "__main__":
    run = Run()
    if (not run.process()):
        run.print_help()
