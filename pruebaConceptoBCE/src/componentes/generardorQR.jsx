// src/GeneradorQr.js
import React from 'react';
import QRCode from 'react-qr-code';

function GeneradorQr({ ciudad, pais, descripccionTicket, genero, motivo, precioTicket, precioTotal }) {

  const qrData = `${ciudad} ${pais} ${descripccionTicket} ${genero} ${motivo} ${precioTicket} ${precioTotal}`;
  
  return (
    <div>
      <QRCode value={qrData} size={200} />
    </div>
  );
}

export default GeneradorQr;
