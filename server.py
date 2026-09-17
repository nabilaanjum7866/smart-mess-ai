#!/usr/bin/env python3
"""
SMARTMESS AI - Local Development HTTP Server
Launches a zero-dependency web server for SMARTMESS AI on Windows/Linux/Mac.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 stdout if supported
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent browser caching during active development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    global PORT
    handler = NoCacheHTTPRequestHandler

    # Attempt binding to PORT, increment if already taken
    while PORT < 8015:
        try:
            with socketserver.TCPServer(("", PORT), handler) as httpd:
                url = f"http://localhost:{PORT}"
                print("=" * 65)
                print("  * SMARTMESS AI - Food Waste Prediction & Reduction System *")
                print("=" * 65)
                print(f"  > Server running at: {url}")
                print(f"  > Serving files from: {DIRECTORY}")
                print("  > Demo Student:  BT2025 (Ayesha Khan)")
                print("  > Demo Staff:    STAFF01 (Chef Suresh)")
                print("=" * 65)
                print("  Press Ctrl+C in this terminal to stop the server.")
                print("=" * 65)

                try:
                    webbrowser.open(url)
                except Exception:
                    pass

                httpd.serve_forever()
        except OSError:
            PORT += 1

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nSMARTMESS AI server stopped gracefully.")
        sys.exit(0)
