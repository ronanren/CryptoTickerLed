#!/usr/bin/env python
from samplebase import SampleBase
from rgbmatrix import graphics
import time, random, os, json
from coingecko_api import get_crypto_data

class Run(SampleBase):
    def __init__(self, *args, **kwargs):
        super(Run, self).__init__(*args, **kwargs)
        self.font = graphics.Font()
        self.font.LoadFont("fonts/6x12.bdf")
        self.whiteColor = graphics.Color(255, 255, 255)
        self.redColor = graphics.Color(255, 0, 0)
        self.greenColor = graphics.Color(0, 128, 0)
        self.HighGreenColor = graphics.Color(0, 250, 100)
        self.blue = graphics.Color(53, 0, 245)

        self.json_file_path = "app/public/config_displays.json"
        
    def get_position_right(self, size_canvas, text):
        position = size_canvas
        for character in text:
            if character == '.':
                position -= 3
            elif character in ['1', '-', '%']:
                position -= 5
            else:
                position -= 6
        return position

    def get_color_for_percent(self, percent):
        if percent.startswith("+"):
            return self.greenColor
        elif percent.startswith("-"):
            return self.redColor
        else:
            return self.whiteColor

    def fetch_type_display(self, display):
        with open(self.json_file_path, 'r') as file:
            json_data = json.load(file)
            type_display = json_data['displays'][display]['type']
            interval = json_data['displays'][display]['interval']
            displays = len(json_data['displays'])
        return type_display, interval, displays

    def show_type_of_display(self, offscreen_canvas, type_display, display):
        if type_display == "crypto":
            ticker, granularity, price, percent, chart = self.fetch_crypto_data(display)
            self.show_crypto_data(offscreen_canvas, ticker, granularity, price, percent, chart)
        if type_display == "text":
            text = self.fetch_text_data(display)
            self.show_text_data(offscreen_canvas, text)

    def fetch_crypto_data(self, display):
        with open(self.json_file_path, 'r') as file:
            json_data = json.load(file)
            displays = len(json_data['displays'])
            interval = json_data['displays'][display]['interval']

            id_crypto = json_data['displays'][display]['id']
            ticker = json_data['displays'][display]['symbol']
            granularity = json_data['displays'][display]['granularity']

        data = get_crypto_data(id_crypto, granularity)
        percent = "{:.2f}".format(data['price_change_percentage_24h'])
        if float(percent) > 0: percent = "+" + percent + "%"
        price = "$" + str(data['current_price'])
        return ticker, granularity, price, percent, data['chart']

    def show_crypto_data(self, offscreen_canvas, ticker, granularity, price, percent, chart):
        offscreen_canvas.Clear()
        size_ticker = graphics.DrawText(offscreen_canvas, self.font, 1, 8, self.whiteColor, ticker)
        size_percent = graphics.DrawText(offscreen_canvas, self.font, self.get_position_right(offscreen_canvas.width, percent), 8, self.get_color_for_percent(percent), percent)

        size_price = graphics.DrawText(offscreen_canvas, self.font, 1, 16, self.whiteColor, price)
        size_granularity = graphics.DrawText(offscreen_canvas, self.font, self.get_position_right(offscreen_canvas.width, granularity), 16, self.blue, granularity)

        for i in range(0, 64):
            nbr = 31 - chart[i]
            graphics.DrawLine(offscreen_canvas, i, 31, i, nbr, self.greenColor)
            offscreen_canvas.SetPixel(i, nbr, self.HighGreenColor.red, self.HighGreenColor.green, self.HighGreenColor.blue)

        self.matrix.SwapOnVSync(offscreen_canvas)

    def fetch_text_data(self, display):
        with open(self.json_file_path, 'r') as file:
            json_data = json.load(file)
            text = json_data['displays'][display]['text']
        return text

    def show_text_data(self, offscreen_canvas, text):
        offscreen_canvas.Clear()
        size_text = graphics.DrawText(offscreen_canvas, self.font, self.get_position_right(offscreen_canvas.width, text) - 16, 16, self.blue, text)
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
