import { Button } from 'react-bootstrap';
import { useState } from 'react';
import GeneradorQr from './generardorQR';
import ScannerQR from './ScannerQR';

function Transacciones() {

  const [recibirDinero, setRecibirDinero] = useState(false);
  const [opciones, setOpciones] = useState(true);
  const [transferirDinero, setTransferirDinero] = useState(false);

  const handleRecibirDinero = () => {
    setRecibirDinero(true);
    setOpciones(false);
  }

  const handleRegresar = () => {
    setRecibirDinero(false);
    setOpciones(true);
  }

  const handleTransferirDinero = () => {
    setTransferirDinero(true);
    setOpciones(false);
  }

  return (
    <div className='flex flex-col gap-3 items-center'>
      {opciones &&
        <>
          <h2>Opciones</h2>
          <Button variant="primary" onClick={handleTransferirDinero}>Transferir Dinero</Button>
          <Button variant="primary" onClick={handleRecibirDinero}>Recibir Dinero</Button>
        </>
      }
      {recibirDinero && (
        <>
          <h2>Recibir Dinero</h2>
          <p>Escanea el código QR para recibir dinero.</p>
          <GeneradorQr 
            ciudad="Quito" 
            pais="Ecuador" 
            descripccionTicket="Entrada a evento" 
            genero="Adulto" 
            motivo="Compra de entrada" 
            precioTicket={10} 
            precioTotal={10}
          />
          <Button variant='secondary' onClick={handleRegresar}>Regresar</Button>
        </>
      )}
      {transferirDinero && (
        <ScannerQR />
      )}
    </div>
  )
}

export default Transacciones