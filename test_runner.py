#!/usr/bin/env python3
"""
Unified CLI Test Runner for Bible Outline & Storyline Studio
Executes unit logic tests and headless browser E2E regression tests.

Usage:
  python3 test_runner.py          # Run all tests (Unit + E2E)
  python3 test_runner.py --unit   # Run unit tests only
  python3 test_runner.py --e2e    # Run E2E browser tests only
"""

import sys
import os
import argparse
import subprocess
import time
import socket
import json
import urllib.request
import re

# ANSI Color Codes
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"

SRC_FILES = [
    "data/bible_catalog.js",
    "data/quiz_bank.js",
    "src/storage.js",
    "src/firebase_config.js",
    "src/firebase_sync.js",
    "src/esv_api.js",
    "src/quiz_engine.js",
    "src/components/Sidebar.js",
    "src/components/TopNavbar.js",
    "src/components/BookRollupView.js",
    "src/components/ChapterEditorView.js",
    "src/components/DiagnosticQuizView.js",
    "src/main.js"
]

def build_bundle(root_dir):
    bundled = []
    for f in SRC_FILES:
        p = os.path.join(root_dir, f)
        if not os.path.exists(p):
            continue
        with open(p, 'r', encoding='utf-8') as src:
            content = src.read()
            content = re.sub(r'import\s+[\s\S]*?from\s+[\'"][^\'"]+[\'"];?', '', content)
            content = re.sub(r'import\s+[\'"][^\'"]+[\'"];?', '', content)
            content = re.sub(r'export\s+(async\s+)?function', r'\1function', content)
            content = re.sub(r'export\s+(const|let|var|class)', r'\1', content)
            content = re.sub(r'export\s*\{[\s\S]*?\};?', '', content)
            content = re.sub(r'export\s+default\s+[\s\S]*?;?', '', content)
            bundled.append(f"// --- FILE: {f} ---\n" + content.strip() + "\n\n")

    out_path = os.path.join(root_dir, "bundle.js")
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write("".join(bundled))

class CDPClient:
    def __init__(self, port, server_port=8000):
        self.port = port
        self.server_port = server_port
        self.sock = None
        self.msg_id = 0

    def connect(self, timeout=6.0):
        start = time.time()
        tabs = []
        while time.time() - start < timeout:
            try:
                res = urllib.request.urlopen(f"http://localhost:{self.port}/json", timeout=1.0).read()
                tabs = json.loads(res.decode('utf-8'))
                if tabs:
                    break
            except Exception:
                time.sleep(0.3)

        page_tabs = [t for t in tabs if t.get('type') == 'page']
        if not page_tabs:
            raise RuntimeError("No browser page tab found in Chrome CDP")

        ws_url = page_tabs[0]['webSocketDebuggerUrl']
        host, path = ws_url.split('ws://')[1].split('/', 1)
        path = '/' + path.lstrip('/')
        p = int(host.split(':')[1])
        h = host.split(':')[0]

        self.sock = socket.socket()
        self.sock.settimeout(5.0)
        self.sock.connect((h, p))
        self.sock.sendall(
            f'GET {path} HTTP/1.1\r\nHost: {h}:{p}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\nSec-WebSocket-Version: 13\r\n\r\n'.encode('utf-8')
        )
        buf = b''
        while b'\r\n\r\n' not in buf:
            buf += self.sock.recv(1024)

        # Ensure page scripts are fully loaded
        wait_start = time.time()
        while time.time() - wait_start < timeout:
            if self.evaluate("typeof BIBLE_BOOKS !== 'undefined'") is True:
                break
            time.sleep(0.15)

    def read_message(self):
        head = self.sock.recv(2)
        if not head or len(head) < 2:
            return None
        b1, b2 = head[0], head[1]
        length = b2 & 0x7f
        if length == 126:
            ext = self.sock.recv(2)
            length = (ext[0] << 8) | ext[1]
        elif length == 127:
            ext = self.sock.recv(8)
            length = int.from_bytes(ext, 'big')

        payload = b''
        while len(payload) < length:
            chunk = self.sock.recv(min(4096, length - len(payload)))
            if not chunk:
                break
            payload += chunk

        try:
            return json.loads(payload.decode('utf-8'))
        except Exception:
            return None

    def evaluate(self, expression, timeout=6.0):
        self.msg_id += 1
        req_id = self.msg_id
        m = json.dumps({'id': req_id, 'method': 'Runtime.evaluate', 'params': {'expression': expression, 'returnByValue': True}}).encode('utf-8')
        mask = bytes([1, 2, 3, 4])
        if len(m) < 126:
            h = bytes([0x81, 0x80 | len(m)]) + mask
        elif len(m) <= 65535:
            h = bytes([0x81, 0x80 | 126, (len(m) >> 8) & 0xff, len(m) & 0xff]) + mask
        else:
            h = bytes([0x81, 0x80 | 127]) + len(m).to_bytes(8, 'big') + mask
        masked = bytes([b ^ mask[i % 4] for i, b in enumerate(m)])
        self.sock.sendall(h + masked)

        start = time.time()
        while time.time() - start < timeout:
            msg = self.read_message()
            if msg and msg.get('id') == req_id:
                res_obj = (msg.get('result') or {}).get('result') or {}
                return res_obj.get('value')
        return None

    def close(self):
        if self.sock:
            try:
                self.sock.close()
            except Exception:
                pass

def find_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

def is_port_open(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect(('localhost', port))
        s.close()
        return True
    except Exception:
        return False

def main():
    parser = argparse.ArgumentParser(description="Bible Outline Studio Regression Test Runner")
    parser.add_argument("--unit", action="store_true", help="Run Unit Logic Tests only")
    parser.add_argument("--e2e", action="store_true", help="Run E2E Browser Tests only")
    parser.add_argument("--all", action="store_true", help="Run full suite (Unit + E2E)")
    args = parser.parse_args()

    run_unit = args.unit or args.all or (not args.unit and not args.e2e)
    run_e2e = args.e2e or args.all or (not args.unit and not args.e2e)

    root_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, os.path.join(root_dir, "tests"))

    print(f"\n{BOLD}{CYAN}======================================================{RESET}")
    print(f"{BOLD}{CYAN}   📖 BIBLE OUTLINE STUDIO — REGRESSION TEST RUNNER   {RESET}")
    print(f"{BOLD}{CYAN}======================================================{RESET}\n")

    # Step 1: Auto-build bundle.js from src/
    print(f"{DIM}⚙️  Verifying & bundling src/ modules -> bundle.js...{RESET}", end="", flush=True)
    build_bundle(root_dir)
    print(f" {GREEN}✓ Ready{RESET}")

    # Step 2: Ensure HTTP server is active
    http_proc = None
    server_port = 8000
    if not is_port_open(server_port):
        print(f"{DIM}🚀 Starting local test HTTP server on port {server_port}...{RESET}", end="", flush=True)
        http_proc = subprocess.Popen([sys.executable, "-m", "http.server", str(server_port)], cwd=root_dir, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(0.8)
        print(f" {GREEN}✓ Active{RESET}")
    else:
        print(f"{DIM}📡 Connecting to local web server on port {server_port}... {GREEN}✓ Active{RESET}")

    # Step 3: Launch Headless Chrome
    cdp_port = find_free_port()
    print(f"{DIM}🌐 Launching isolated Headless Chrome (CDP port {cdp_port})...{RESET}", end="", flush=True)
    chrome_proc = subprocess.Popen([
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless',
        f'--remote-debugging-port={cdp_port}',
        f'http://localhost:{server_port}/'
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.2)
    cdp = CDPClient(cdp_port, server_port=server_port)
    try:
        cdp.connect()
        print(f" {GREEN}✓ Connected{RESET}\n")
    except Exception as e:
        print(f" {RED}✗ Failed to connect: {e}{RESET}\n")
        if chrome_proc: chrome_proc.terminate()
        if http_proc: http_proc.terminate()
        sys.exit(1)

    all_results = []
    total_start = time.time()

    from test_unit import UnitTester
    from test_e2e import E2ETester

    if run_unit:
        print(f"{BOLD}🧪 SUITE 1: Pure Logic & Data Structure Unit Tests{RESET}")
        print("-" * 65)
        unit_runner = UnitTester(cdp)
        unit_res = unit_runner.run_all()
        for name, passed, dur, err in unit_res:
            status = f"{GREEN}✓ PASSED{RESET}" if passed else f"{RED}✗ FAILED{RESET}"
            print(f"  [{status}] {name:<48} {DIM}({dur}){RESET}")
            if err:
                print(f"      {RED}↳ Error: {err}{RESET}")
        all_results.extend(unit_res)
        print()

    if run_e2e:
        print(f"{BOLD}🌐 SUITE 2: End-to-End Browser UI & Interaction Tests{RESET}")
        print("-" * 65)
        e2e_runner = E2ETester(cdp)
        e2e_res = e2e_runner.run_all()
        for name, passed, dur, err in e2e_res:
            status = f"{GREEN}✓ PASSED{RESET}" if passed else f"{RED}✗ FAILED{RESET}"
            print(f"  [{status}] {name:<48} {DIM}({dur}){RESET}")
            if err:
                print(f"      {RED}↳ Error: {err}{RESET}")
        all_results.extend(e2e_res)
        print()

    total_time = time.time() - total_start
    passed_count = sum(1 for _, p, _, _ in all_results if p)
    failed_count = sum(1 for _, p, _, _ in all_results if not p)
    total_count = len(all_results)

    # Cleanup
    cdp.close()
    if chrome_proc:
        chrome_proc.terminate()
    if http_proc:
        http_proc.terminate()

    # Summary
    print(f"{BOLD}======================================================{RESET}")
    if failed_count == 0:
        print(f"{BOLD}{GREEN}🎉 ALL {total_count} REGRESSION TESTS PASSED! ({total_time:.2f}s total){RESET}")
        print(f"{BOLD}======================================================{RESET}\n")
        sys.exit(0)
    else:
        print(f"{BOLD}{RED}⚠️  {failed_count} OF {total_count} TESTS FAILED ({passed_count} passed, {total_time:.2f}s total){RESET}")
        print(f"{BOLD}======================================================{RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
