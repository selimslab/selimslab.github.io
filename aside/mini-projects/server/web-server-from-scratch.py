# coding: utf-8
"""
a simple concurrent web server

socket -> bind -> listen -> accept -> loop 
"""
import socket
import os 
import time
import signal
import errno

# Define socket host and port
SERVER_HOST = '0.0.0.0'
SERVER_PORT = 8000

"""
A socket is an abstraction of a communication endpoint 
and it allows your program to communicate with another program using file descriptors. 

The socket pair for a TCP connection is a 4-tuple
that identifies two endpoints of the TCP connection: 
the local IP address, local port, foreign IP address, and foreign port.

eg. (0.0.0.1:80, 0.0.0.2:6379) is a socket pair and 0.0.0.1:80 is a socket 
"""

def wait_for_children_process(signum, frame):
    """
    If you don’t close duplicate descriptors, 
    the clients won’t terminate because the client connections won’t get closed.
    
    Moreover, your long-running server will eventually 
    run out of available file descriptors (max open files).

    When you fork a child process and it exits 
    if the parent process doesn’t wait for it and doesn’t collect its termination status,
    the child process becomes a zombie.

    Zombies need to eat something and, in our case, it’s memory. 

    Your server will eventually run out of available processes (max user processes) 
    if it doesn’t take care of zombies.

    You can’t kill a zombie, you need to wait for it.

    If you fork a child and don’t wait for it, it becomes a zombie.
    """
    while True:
        try:
            pid, status = os.waitpid(
                -1,          # Wait for any child process
                 os.WNOHANG  # Do not block and return EWOULDBLOCK error
            )
        except OSError:
            return

        if pid == 0:  # no more zombies
            return

def serve():
    # Create socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # add socket options
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # bind -> assign a local protocol address to the socket
    server_socket.bind((SERVER_HOST, SERVER_PORT))
    # listen -> make the socket a listening socket
    server_socket.listen(1)
    print('Listening on port %s ...' % SERVER_PORT)

    """
    Use the SIGCHLD event handler to asynchronously 
    wait for a terminated child to get its termination status

    When using an event handler you need to keep in mind that
    system calls might get interrupted 
    and you need to be prepared for that scenario
    """
    signal.signal(signal.SIGCHLD, wait_for_children_process)

    # accept and loop 
    while True:    
        try:
            # Wait for client connections
            client_connection, client_address = server_socket.accept()
        except IOError as e:
            code, msg = e.args
            # restart 'accept' if it was interrupted
            if code == errno.EINTR:
                continue
            else:
                raise

        # Get the client request
        request = client_connection.recv(1024).decode()

        """
        The simplest way to write a concurrent server in Unix
        is to use the fork() system call

        When a process forks a new process,
        it becomes a parent process to that newly forked child process.

        Parent and child share the same file descriptors after the call to fork.

        The kernel uses descriptor reference counts 
        to decide whether to close the file/socket or not

        The role of a server parent process: 
        1. all it does now is accept a new connection from a client, 
        2. fork a child to handle the client request, 
        3. and loop over to accept a new client connection.
        """
        pid = os.fork()
        if pid == 0:  # child
            server_socket.close()  # close child copy
            print(f'Child PID: {pid=os.getpid()}. Parent PID {ppid=os.getppid()}')
            response = "HTTP/1.1 200 OK\n\nHello, World!"
            client_connection.sendall(response.encode())
            client_connection.close()
            os._exit(0)  # child exits here
        else:  # parent
            client_connection.close()


if __name__ == '__main__':
    serve()