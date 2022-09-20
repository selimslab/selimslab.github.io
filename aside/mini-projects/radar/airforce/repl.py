import threading

from .monitor import TrackingStreamMonitor

try:
    import readline
except:
    pass  # readline not available


def start_stream_monitor(monitor: TrackingStreamMonitor):
    # start the api monitor in a separate thread
    t1 = threading.Thread(target=monitor.process_target_updates)
    t1.start()


def repl(monitor: TrackingStreamMonitor):
    start_stream_monitor(monitor)
    commands = {
        "plot": lambda: monitor.plot(),
        "stats": lambda: monitor.print_stats(),
        "help": lambda: print("type stats or plot"),
    }
    commands["help"]()
    while True:
        command = input("airforce > ")
        if command in commands:
            commands[command]()
