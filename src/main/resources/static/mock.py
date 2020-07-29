
from datetime import date, datetime
from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler
import json


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = [
            {
                "title": "hello",
                "paragraph": '''内网: 192.168.31.4\n校园网: 202.38.86.126，目前映射了如下端口\n22->22; 6080->80''',
                "timestamp": datetime.now()
            },
            {
                "title": "halo",
                "paragraph": '''内网: 192.168.31.4\n校园网: 202.38.86.126，目前映射了如下端口\n22->22; 6080->80''',
                "timestamp": datetime.now()
            }
        ]
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())


if __name__ == "__main__":
    port = 8080
    server = HTTPServer(("0.0.0.0", port), RequestHandler)
    print("started server at ", port)
    server.serve_forever()
