import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

function ScannerQR({ fps, qrbox, disableFlip, qrCodeSuccessCallback, qrCodeErrorCallback }) {

  useEffect(() => {
    const config = createConfig({ fps, qrbox, disableFlip });
    const verbose = false; // Set to true if you want verbose logging

    if (!qrCodeSuccessCallback) {
      console.error("qrCodeSuccessCallback is required.");
      return;
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [fps, qrbox, disableFlip, qrCodeSuccessCallback, qrCodeErrorCallback]);

  return (
    <div id={qrcodeRegionId} />
  );
}

export default ScannerQR;
