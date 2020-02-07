# WebUSB API Test
This repository contains testing sketch and simple web page to control Arduino from Google Chrome with WebUSB API. 
The WebUSB API library is taken from [here](https://github.com/webusb/arduino).

## Getting Started

1. Install at least version 1.6.11 of the [Arduino IDE](https://www.arduino.cc/en/Main/Software).

2. The WebUSB library provides all the extra low-level USB code necessary for WebUSB support except for one thing: 
Your device must be upgraded from USB 2.0 to USB 2.1. To do this go into the SDK installation directory and 
open `hardware/arduino/avr/cores/arduino/USBCore.h`. Then find the line `#define USB_VERSION 0x200` and change `0x200` to `0x210`.

3. Copy (or symlink) the `library/WebUSB` directory from this repository into the `libraries` folder in your sketchbooks directory.

4. Connect the LED to pin 10 of the Arduino board.

5. Launch the Arduino IDE. You should see "WebUSB" as an option under "Sketch > Include Library".

6. Load up `sketch/sketch.ino` and program it to your device.

7. When the sketch is finished uploading, follow this link https://alexeramp.github.io/

8. You should automatically connect to Arduino. If this does not happen, check the connection and click the "Connect" button.

9. If the connection is successful, move the "Brightness" slider to the right, increasing the brightness of the LED.
