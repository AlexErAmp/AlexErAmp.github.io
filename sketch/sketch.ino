#include <WebUSB.h>

/**
 * Creating an instance of WebUSBSerial will add an additional USB interface to
 * the device that is marked as vendor-specific (rather than USB CDC-ACM) and
 * is therefore accessible to the browser.
 *
 * The URL here provides a hint to the browser about what page the user should
 * navigate to to interact with the device.
 */
WebUSB WebUSBSerial(1 /* https:// */, "alexeramp.github.io");

#define Serial WebUSBSerial

const int redPin = 10;
int brightness = 0;
int brightnessArr[4];
int brightnessIndex;

void setup() {
    while (!Serial) {
        ;
    }
    Serial.begin(9600);
    Serial.write("Sketch begins.\r\n");
    Serial.flush();
    brightnessIndex = 0;
}

void loop() {
    if (Serial && Serial.available()) {
        brightnessArr[brightnessIndex++] = Serial.read();
        if (brightnessIndex == 4) {
            brightness = 0;
            for (int i = 0; i < 4; i++) {
                int shift = (4 - 1 - i) * 8;
                brightness += (brightnessArr[i] & 0x000000FF) << shift;
            }
            analogWrite(redPin, brightness);
            Serial.print("Set brightness to ");
            Serial.print(brightness);
            Serial.print(".\r\n");
            Serial.flush();
            brightnessIndex = 0;
        }
    }
}
