#!/usr/bin/env python
# Display a runtext with double-buffering.
from samplebase import SampleBase
from rgbmatrix import graphics
import time, random


class Run(SampleBase):
    def __init__(self, *args, **kwargs):
        super(Run, self).__init__(*args, **kwargs)
        self.whiteColor = graphics.Color(255, 255, 255)
        self.redColor = graphics.Color(255, 0, 0)
        self.greenColor = graphics.Color(0, 128, 0)
        self.HighGreenColor = graphics.Color(0, 250, 100)

    def get_position_right(self, size_canvas,text):
        position = size_canvas
        for character in text:
            if character == '.':
                position -= 3
            elif character in ['1', '-']:
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

    def run(self):
        offscreen_canvas = self.matrix.CreateFrameCanvas()
        font = graphics.Font()
        font.LoadFont("fonts/6x12.bdf")

        ticker = "BTC"
        percent = "+2.40%"
        price = "$28679.85"

        while True:
            offscreen_canvas.Clear()

            size_ticker = graphics.DrawText(offscreen_canvas, font, 1, 8, self.whiteColor, ticker)
            size_percent = graphics.DrawText(offscreen_canvas, font, self.get_position_right(offscreen_canvas.width, percent), 8, self.get_color_for_percent(percent), percent)

            size_price = graphics.DrawText(offscreen_canvas, font, 1, 16, self.whiteColor, price)

            # graphic 
            for i in range(0, 64):
                nbr = random.randint(17, 31)
                graphics.DrawLine(offscreen_canvas, i, 31, i, nbr, self.greenColor)
                offscreen_canvas.SetPixel(i, nbr, self.HighGreenColor.red, self.HighGreenColor.green, self.HighGreenColor.blue)

            
            offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
            time.sleep(5)

if __name__ == "__main__":
    run = Run()
    if (not run.process()):
        run.print_help()
