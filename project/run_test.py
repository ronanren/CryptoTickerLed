import time

class Run:
    def __init__(self, *args, **kwargs):
        super(Run, self).__init__(*args, **kwargs)
        self.ticker = "BTC"

    def run(self):
        percent = "+2.40%"
        price = "$28679.85"

        while True:
            print("Ticker: %s" % self.ticker)
            time.sleep(2)

if __name__ == "__main__":
    run = Run()
    run.run()
