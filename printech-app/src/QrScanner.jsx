import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const qrcodeRegionId = "html5qr-code-full-region";

const QrScanner = ({ onScan, onError, onCancel }) => {
  useEffect(() => {
    const html5Qrcode = new Html5Qrcode(qrcodeRegionId);
    let scannerRunning = true;

    const start = async () => {
      try {
        await html5Qrcode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText, decodedResult) => {
            if (scannerRunning) {
              onScan(decodedText, decodedResult);
              // Stop the scanner after a successful scan
              if (html5Qrcode && html5Qrcode.isScanning) {
                html5Qrcode.stop().catch(err => console.error("Failed to stop scanner:", err));
              }
              scannerRunning = false;
            }
          },
          (errorMessage) => {
            // This is the "on-going" error callback, we can ignore it for now
          }
        );
      } catch (err) {
        onError(err.message || "Failed to start camera.");
      }
    };

    start();

    // Cleanup function to stop the scanner when the component unmounts
    return () => {
      if (html5Qrcode && html5Qrcode.isScanning) {
        html5Qrcode.stop().catch(err => console.error("Cleanup: Failed to stop scanner:", err));
      }
    };
  }, [onScan, onError]);

  return (
    <div>
      <div id={qrcodeRegionId} style={{ width: '100%', height: '100%' }} />
      <button 
        onClick={onCancel}
        style={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          padding: "8px 14px", 
          borderRadius: 8, 
          border: '1px solid rgba(255,255,255,0.5)', 
          background: 'rgba(0,0,0,0.4)', 
          color: 'white', 
          fontSize: 12, 
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default QrScanner;
