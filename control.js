(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", event => {
    let connectButton = document.querySelector("#connect");
    let statusDisplay = document.querySelector("#status");
    let brightnessSlider = document.querySelector("#brightness");
    let port;

    function toBytesInt32(num) {
      let arr = new Uint8Array([
        (num & 0xff000000) >> 24,
        (num & 0x00ff0000) >> 16,
        (num & 0x0000ff00) >> 8,
        num & 0x000000ff
      ]);
      return arr;
    }

    function connect() {
      port.connect().then(
        () => {
          statusDisplay.textContent = "";
          connectButton.value = "Disconnect";

          port.onReceive = data => {
            let textDecoder = new TextDecoder();
            console.log(textDecoder.decode(data));
          };
          port.onReceiveError = error => {
            console.error(error);
          };
        },
        error => {
          statusDisplay.textContent = error;
        }
      );
    }

    function onUpdate() {
      if (!port) {
        return;
      }

      let value = parseInt(brightnessSlider.value);
      console.log("Current brightness value", value);
      port.send(toBytesInt32(value));
    }

    brightnessSlider.addEventListener("input", onUpdate);

    connectButton.addEventListener("click", function() {
      if (port) {
        port.disconnect();
        connectButton.value = "Connect";
        statusDisplay.textContent = "";
        port = null;
      } else {
        serial
          .requestPort()
          .then(selectedPort => {
            port = selectedPort;
            connect();
          })
          .catch(error => {
            statusDisplay.textContent = error;
          });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length == 0) {
        statusDisplay.textContent = "No device found.";
      } else {
        statusDisplay.textContent = "Connecting...";
        port = ports[0];
        connect();
      }
    });
  });
})();
