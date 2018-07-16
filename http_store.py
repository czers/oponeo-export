from os import curdir
from os.path import join as pjoin

from http.server import BaseHTTPRequestHandler, HTTPServer
import ssl

class StoreHandler(BaseHTTPRequestHandler):
    store_path = pjoin(curdir, 'store.txt')

    def do_GET(self):
        if self.path == '/store.txt':
            with open(self.store_path) as fh:
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(fh.read().encode())

    def do_POST(self):
        if self.path == '/store.txt':
            length = self.headers['content-length']
            data = self.rfile.read(int(length))

            with open(self.store_path, 'a') as fh:
                fh.write(data.decode())

            self.send_response(200)


server = HTTPServer(('', 8080), StoreHandler)

server.socket = ssl.wrap_socket (server.socket, 
        keyfile="key.pem", 
        certfile='cert.pem', server_side=True)

server.serve_forever()
