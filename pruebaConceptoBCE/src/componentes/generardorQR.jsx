// src/GeneradorQr.js
import React from 'react';
import QRCode from 'react-qr-code';

function GeneradorQr({ beneficiario, entidadFinanciera, numCuenta, ciudadOrigen }) {

  const qrData = JSON.stringify({
    beneficiario,
    entidadFinanciera,
    numCuenta,
    ciudadOrigen
  });
  
  return (
    <div>
      <QRCode value={qrData} size={200} />
    </div>
  );
}

export default GeneradorQr;
