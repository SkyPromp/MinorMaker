import asyncio
import serial
import serial.tools.list_ports
import websockets
import ctypes
from pynput.keyboard import Controller, Key

keyboard = Controller()
socket_name = 'Knoppen'

# -------- AUTO-DETECT ARDUINO SERIAL PORT --------
def find_arduino_port():
    ports = serial.tools.list_ports.comports()
    for port in ports:
        desc = port.description.lower()
        if "arduino" in desc or "ch340" in desc or "usb serial" in desc:
            print(f"[OK] Found Arduino on {port.device}")
            return port.device

    print("[ERROR] No Arduino detected. Available ports:")
    for port in ports:
        print(" -", port.device, port.description)
    raise Exception("Plug in your Arduino and try again.")

try:
    arduino_port = find_arduino_port()
    ser = serial.Serial(arduino_port, 9600)
    # --------------------------------------------------
    ctypes.windll.user32.MessageBoxW(0, "App started successfully!", "Buttons", 0)

    clients = set()

    async def serial_reader():
        while True:
            try:
                line = ser.readline().decode(errors="ignore").strip()

            except serial.SerialException as e:
                # Arduino unplugged, corrupted COM, or device lost
                ctypes.windll.user32.MessageBoxW(
                    0,
                    f"Knoppen zijn niet meer verbonden!\n",
                    socket_name,
                    16
                )

                # Notify WebSocket clients
                for ws in list(clients):
                    try:
                        await ws.send("ARDUINO_DISCONNECTED")
                    except:
                        pass
                    await ws.close()

                # Stop the program
                raise SystemExit("Arduino disconnected")        
            if not line:
                continue

            print("Arduino:", line)

            if line == "RED_BUTTON_PRESSED":
                keyboard.press('m')
                keyboard.release('m')
                
            if line == "YELLOW_BUTTON_PRESSED":
                keyboard.press('l')
                keyboard.release('l')
                
            if line == "GREEN_BUTTON_PRESSED":
                keyboard.press('k')
                keyboard.release('k')

            # Send to all connected browsers
            for ws in clients:
                await ws.send(line)

    async def ws_handler(websocket):
        clients.add(websocket)
        try:
            await websocket.wait_closed()
        except Exception as e:
            ctypes.windll.user32.MessageBoxW(
                0,
                f"Programma wordt afgesloten.\n",
                socket_name,
                16  # error icon
            )    
            clients.remove(websocket)

        finally:
            clients.remove(websocket)

    async def main():
        server = await websockets.serve(ws_handler, "localhost", 8080)
        print("WebSocket server started on ws://localhost:8080")
        await serial_reader()

    asyncio.run(main())

except Exception as e:
    ctypes.windll.user32.MessageBoxW(
        0,
        f"Knoppen zijn niet verbonden!\n",
        socket_name,
        16
        )
    