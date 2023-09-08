#!/usr/bin/env python
# Display a runtext with double-buffering.
from samplebase import SampleBase
from rgbmatrix import graphics
import time


class Run(SampleBase):
    def __init__(self, *args, **kwargs):
        super(Run, self).__init__(*args, **kwargs)

    def run(self):
        offscreen_canvas = self.matrix.CreateFrameCanvas()
        font = graphics.Font()
        font.LoadFont("fonts/6x12.bdf")
        textColor = graphics.Color(255, 255, 255)
        pos = 0
        header = "AAPL -0.24%"
        price = "$143.52"

        while True:
            offscreen_canvas.Clear()
            size_header = graphics.DrawText(offscreen_canvas, font, 1, 8, textColor, header)
            size_price = graphics.DrawText(offscreen_canvas, font, 1, 16, textColor, price)

            time.sleep(0.1)
            offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)

if __name__ == "__main__":
    run = Run()
    if (not run.process()):
        run.print_help()
