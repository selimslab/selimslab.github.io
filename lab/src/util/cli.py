from rich import print
from typing import Callable
import traceback
import readline
import os


def cli(func: Callable, prompt: str = "> "):
    # Set up history file
    history_file = os.path.expanduser("~/.cli_history")
    
    # Load existing history
    try:
        readline.read_history_file(history_file)
    except FileNotFoundError:
        pass
    
    # Set history length
    readline.set_history_length(1000)
        
    while True:
        try:
            # Get input with history support
            user_input = input(prompt).strip()
                        
            # Skip empty input
            if not user_input:
                continue
            
            # Call the function with the input
            func(user_input)
            
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except EOFError:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"Error: {e}")
            traceback.print_exc()
        finally:
            # Save history
            try:
                readline.write_history_file(history_file)
            except:
                pass
