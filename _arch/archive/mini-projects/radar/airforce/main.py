from airforce.monitor import monitor
from airforce.repl import repl
from airforce.util.logger import logger 

def start_tracking():
    logger.info("Starting a repl..")
    repl(monitor)

if __name__ == "__main__":
    start_tracking()
