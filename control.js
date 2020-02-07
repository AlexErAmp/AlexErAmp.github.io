(function() {
  "use strict";

  function toBytesInt32(num) {
    let arr = new Uint8Array([
      (num & 0xff000000) >> 24,
      (num & 0x00ff0000) >> 16,
      (num & 0x0000ff00) >> 8,
      (num & 0x000000ff)
    ]);
    return arr;
  }
  function displayMessage(selector, msg) {
    $(selector).html(msg);
    $(selector).fadeIn();
    setTimeout(function() {
      $(selector).fadeOut();
    }, 4000);
  }

  document.addEventListener("DOMContentLoaded", event => {
    let connectButton = document.querySelector("#connect");
    let statusDisplay = document.querySelector("#status");
    let brightnessSlider = document.querySelector("#brightness");
    let port;

    function connect() {
      port.connect().then(
        () => {
          displayMessage("#status", "Connection successful");
          connectButton.innerHTML = "Disconnect";

          port.onReceive = data => {
            let textDecoder = new TextDecoder();
            console.log(textDecoder.decode(data));
          };
          port.onReceiveError = error => {
            console.error(error);
          };
        },
        error => {
          displayMessage("#status", error);
        }
      )
      .then(() => {
        setTimeout(onUpdate, 1000);
      });
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
        connectButton.innerHTML = "Connect";
        displayMessage("#status", "Connection closed");
        port = null;
      } else {
        serial
          .requestPort()
          .then(selectedPort => {
            port = selectedPort;
            connect();
          })
          .catch(error => {
            displayMessage("#status", error);
          });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length == 0) {
        displayMessage("#status", "No device found.");
      } else {
        displayMessage("#status","Connecting...");
        port = ports[0];
        setTimeout(connect, 2000);
      }
    });
  });
})();
